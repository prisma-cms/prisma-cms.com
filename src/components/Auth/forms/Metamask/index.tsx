import React from 'react'

import gql from 'graphql-tag'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

import { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'

// import LinearProgress from 'material-ui/Progress/LinearProgress';

import AuthForm from '../'

import * as ethUtil from 'ethereumjs-util'
import { MetamaskFormProps, MetamaskFormState } from './interfaces'

const globalAny: any = global

class MetamaskForm extends AuthForm<MetamaskFormProps, MetamaskFormState> {
  // static propTypes = {
  //   ...AuthForm.propTypes,
  // }

  onChange(event: any) {
    const { name, value } = event.target

    const { data } = this.state

    this.setState({
      data: {
        ...data,
        [name]: value,
      },
    })
  }

  connect() {
    const { ethereum } = globalAny

    if (typeof ethereum !== 'undefined') {
      ethereum.enable().catch(console.error)
    }
  }

  renderFields() {
    let output

    const { ethereum } = globalAny

    /**
     * Check metamask plugin
     */
    if (!ethereum) {
      output = (
        <div>
          <Typography color="error" variant="subheading">
            Плагин Metamask не обнаружен.
          </Typography>

          <Typography>
            Смотрите инструкцию по установке на{' '}
            <a href="https://metamask.io/" target="_blank" rel="noreferrer">
              официальном сайте
            </a>
            .
          </Typography>
        </div>
      )
    } else {
      output = (
        <div>
          <Typography>
            Будет выполнена попытка авторизации через сеть Ethereum.
          </Typography>

          <Typography>
            Если пользователя в системе еще нет, будет создан новый
            пользователь.
          </Typography>

          <Typography>
            Если пользователь в системе уже есть, он будет авторизован.
          </Typography>
        </div>
      )
    }

    return output
  }

  async signup() {
    const { ethereum, web3 } = globalAny

    if (!ethereum) {
      this.addError('Плагин Metamask не обнаружен')

      return
    }

    await ethereum
      .enable()
      .then(() => {
        const { selectedAddress: from } = ethereum

        if (!from) {
          return this.connect()
        }

        const message = `
    Будет выполнена попытка авторизации через сеть Ethereum с использованием аккаунта ${from}.

    Если пользователя в системе еще нет, будет создан новый пользователь.

    Если пользователь в системе уже есть, он будет авторизован.
    `

        const msg = ethUtil.bufferToHex(Buffer.from(message, 'utf8'))

        const params = [msg, from]
        const method = 'personal_sign'

        web3.currentProvider.sendAsync(
          {
            method,
            params,
            from,
          },
          async (err: Error, result: any) => {
            if (err) {
              this.addError(err)

              return
            }

            const { error, result: signature } = result

            if (error) {
              console.error(result.error)

              // this.addError(error && error.message || "Неизвестная ошибка");

              return
            }

            const UserNoNestingFragment = `fragment UserNoNesting on User {
            id
            createdAt
            updatedAt
            username
            email
            phone
            showEmail
            showPhone
            fullname
            image
            address
            active
            activated
            deleted
            hidden
            marketplaceToken
            sudo
            hasEmail
            hasPhone
          }`

            const signup = `
            mutation ethSigninOrSignup(
              $data:EthRecoverPersonalSignatureDataInput!
            ){
              response: ethSigninOrSignup(
                data:$data
              ){
                success
                message
                errors{
                  key
                  message
                }
                token
                data{
                  ...UserNoNesting
                }
              }
            }
            
            ${UserNoNestingFragment}
          `

            const {
              signupInRequest,
              // data,
            } = this.state

            if (signupInRequest) {
              return
            }

            this.setState({
              signupInRequest: true,
            })

            const data = {
              message,
              signature,
              from,
            }

            const auth = await this.mutate({
              mutation: gql(signup),
              variables: {
                data,
              },
            })
              .then((r: any) => {
                this.onAuth(r)

                return r
              })
              .catch((error: Error) => {
                console.error(error)

                return error
              })

            this.setState({
              signupInRequest: false,
            })

            return auth
          }
        )
      })
      .catch((error: Error) => {
        this.addError(error)
        console.error(error)
      })
  }

  cleanForm() {
    this.setState({
      data: null,
    })

    this.switchForm('signin')

    return super.cleanForm()
  }

  onClickCancel = () => {
    this.closeForm()
  }

  onSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    this.signup()
  }

  renderForm() {
    const actions = []

    // const values = Object.values({ ...data }).filter(n => n);

    actions.push(
      <Button key="submit" color="primary" type="submit" size="small">
        {this.lexicon('Signin')}
      </Button>
    )

    actions.push(
      <Button
        key="cancel"
        // color="primary"
        onClick={this.onClickCancel}
        size="small"
      >
        {this.lexicon('Cancel')}
      </Button>
    )

    return (
      <form
        style={{
          width: '100%',
        }}
        onSubmit={this.onSubmit}
      >
        <DialogTitle>{this.lexicon('Metamask')}</DialogTitle>

        <DialogContent>{this.renderFields()}</DialogContent>

        <DialogActions>{actions}</DialogActions>
      </form>
    )
  }

  // render() {
  //   return (
  //     <div>

  //     </div>
  //   );
  // }
}

// export default (MetamaskForm as unknown) as React.FC<MetamaskFormProps>

export default MetamaskForm
