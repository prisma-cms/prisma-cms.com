import React from 'react'

import { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'

import Grid from 'src/uikit/Grid'

import AuthForm from '../'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import gql from 'graphql-tag'
import { SignupFormProps, SignupFormState } from './interfaces'

// import PhoneField from '@prisma-cms/front/lib/modules/ui/Input/Phone'
import PhoneField from 'src/uikit/Input/Phone'

class SignupForm extends AuthForm<SignupFormProps, SignupFormState> {
  // static propTypes = {
  //   ...AuthForm.propTypes,
  // }

  constructor(props: any) {
    super(props)

    this.state = {
      ...this.state,
      signupInRequest: false,
    }
  }

  onChange = (event: any) => {
    const { name, value } = event.target

    const { data } = this.state

    this.setState({
      data: {
        ...data,
        [name]: value,
      },
    })
  }

  renderFields() {
    // const {
    //   Grid,
    //   PhoneField,
    // } = this.context;

    const { data } = this.state

    const { username, email, phone, fullname, password } = data || {}

    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          {this.renderField(
            <TextField
              label={this.lexicon('Login')}
              name="username"
              fullWidth
              value={username || ''}
              onChange={this.onChange}
            />
          )}
        </Grid>

        <Grid item xs={12}>
          {this.renderField(
            <TextField
              label={this.lexicon('Email')}
              name="email"
              fullWidth
              value={email || ''}
              onChange={this.onChange}
            />
          )}
        </Grid>

        <Grid item xs={12}>
          {this.renderField(
            <PhoneField
              label={this.lexicon('Phone')}
              name="phone"
              fullWidth
              value={phone || ''}
              onChange={this.onChange}
            />
          )}
        </Grid>

        <Grid item xs={12}>
          {this.renderField(
            <TextField
              label={this.lexicon('Fullname')}
              name="fullname"
              fullWidth
              value={fullname || ''}
              onChange={this.onChange}
            />
          )}
        </Grid>

        <Grid item xs={12}>
          {this.renderField(
            <TextField
              label={this.lexicon('Password')}
              name="password"
              type="password"
              fullWidth
              value={password || ''}
              onChange={this.onChange}
            />
          )}
        </Grid>
      </Grid>
    )
  }

  async signup() {
    const {
      signup = `
        mutation signup(
          $data:UserCreateInput!
        ){
          response: signup(
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
              ...user
            }
          }
        }
        
        
        fragment user on User {
          id
          username
          email
          phone
          showEmail
          showPhone
          sudo
          hasEmail
          hasPhone
        }
      `,
    } = this.context.query || {}

    const { signupInRequest, data } = this.state

    if (signupInRequest) {
      return
    }

    this.setState({
      signupInRequest: true,
    })

    const result = await this.mutate({
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

    return result
  }

  cleanForm() {
    this.setState({
      data: null,
    })

    this.switchForm('signin')

    return super.cleanForm()
  }

  renderForm() {
    const { data } = this.state

    const { useMetamask } = this.props

    const actions = []

    const values = Object.values({ ...data }).filter((n) => n)

    if (useMetamask) {
      actions.push(
        <Button
          key="metamask"
          // color="primary"
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => {
            this.switchForm('metamask')
          }}
          size="small"
        >
          {this.lexicon('Metamask')}
        </Button>
      )
    }

    actions.push(
      <Button
        key="cancel"
        // color="primary"
        onClick={this.closeForm}
        size="small"
      >
        {this.lexicon('Cancel')}
      </Button>
    )

    if (values.length) {
      actions.push(
        <Button key="submit" color="primary" type="submit" size="small">
          {this.lexicon('Signup')}
        </Button>
      )
    } else {
      actions.unshift(
        <Button
          key="switchForm"
          // color="primary"
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => {
            this.switchForm('signin')
          }}
          size="small"
        >
          {this.lexicon('Signin')}
        </Button>
      )
    }

    return (
      <form
        style={{
          width: '100%',
        }}
        // eslint-disable-next-line react/jsx-no-bind
        onSubmit={(event) => {
          event.preventDefault()

          this.signup()
        }}
      >
        <DialogTitle>{this.lexicon('Signup')}</DialogTitle>

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

// export default (SignupForm as unknown) as React.FC<SignupFormProps>

export default SignupForm
