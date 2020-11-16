import React from 'react'
// import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import gql from 'graphql-tag'

import { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'

import Grid from 'src/components/ui/Grid'

import LinearProgress from 'material-ui/Progress/LinearProgress'
import Avatar from 'src/uikit/Avatar'

import AuthForm from '../..'
import { AuthUsersProps, AuthUsersState } from './interfaces'
import {
  AuthFormUsersConnectionUserFragment,
  SigninDocument,
  SigninMutationResult,
} from 'src/modules/gql/generated'
import UsersList from './UsersList'

class AuthUsers extends AuthForm<AuthUsersProps, AuthUsersState> {
  // props: AuthUsersProps

  // state!: AuthForm['state'] & {
  //   // resetPasswordId: string | null;
  //   resetPasswordInRequest: boolean

  //   resetPasswordId: string | null

  //   resetPasswordCode: string | null
  // }

  // static propTypes = {
  //   ...AuthForm.propTypes,
  //   data: PropTypes.object,
  //   setFilters: PropTypes.func.isRequired,
  //   getFilters: PropTypes.func.isRequired,
  //   onPasswordChange: PropTypes.func.isRequired,
  //   password: PropTypes.string.isRequired,
  //   loginComplete: PropTypes.func.isRequired,
  // }

  constructor(props: AuthUsersProps) {
    super(props)

    this.state = {
      ...this.state,

      resetPasswordInRequest: false,
    }
  }

  // shouldComponentUpdate(nextProps: Readonly<AuthUsersProps>): boolean {

  //   console.log('shouldComponentUpdate nextProps', { ...nextProps });
  //   console.log('shouldComponentUpdate this.props', { ...this.props });

  //   const loading = nextProps.data?.loading;

  //   return false;

  //   return !loading;
  // }

  renderSearchForm() {
    const { getFilters } = this.props

    const name = 'search'

    const { [name]: search } = getFilters() || {}

    return this.renderField(
      <TextField
        label={this.lexicon('Login')}
        helperText={this.lexicon('Login, email, phone or user ID')}
        fullWidth
        name={name}
        value={search || ''}
        onChange={this.onLoginChange}
      />
    )
  }

  onLoginChange = (event: any) => {
    const { value, name } = event.target

    this.setFilters({
      [name]: value ? value : undefined,
    })
  }

  setFilters = (filters: any) => {
    const { setFilters } = this.props

    return setFilters(filters)
  }

  async signin(options: any) {
    // const {
    //   signin = `
    //     `,
    // } = this.context.query || {}

    return await this.mutate({
      mutation: SigninDocument,
      ...options,
    })
      .then(async (r: SigninMutationResult) => {
        await this.onAuth(r)

        return r
      })
      .catch(console.error)
  }

  async resetPassword(options: any) {
    const {
      resetPasswordProcessor = `
        mutation resetPasswordProcessor(
          $where: UserWhereUniqueInput!
          $data:ResetPasswordInput!
        ){
          response: resetPasswordProcessor(
            where: $where
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

    const { resetPasswordInRequest } = this.state

    if (resetPasswordInRequest) {
      return
    }

    this.setState({
      resetPasswordInRequest: true,
    })

    const result = await this.mutate({
      mutation: gql(resetPasswordProcessor),
      ...options,
    })
      .then((r: any) => {
        this.onAuth(r)

        return r
      })
      .catch(console.error)

    this.setState({
      resetPasswordInRequest: false,
    })

    return result
  }

  cleanFilters() {
    const { cleanFilters } = this.props

    return cleanFilters()
  }

  cleanForm() {
    this.cleanFilters()

    this.setState({
      resetPasswordId: null,
      resetPasswordCode: null,
    })

    super.cleanForm()
  }

  onRequestClose() {
    this.cleanForm()

    return super.onRequestClose()
  }

  setFormMetamask = () => {
    this.switchForm('metamask')
  }

  renderForm(): JSX.Element | null {
    const {
      // Grid,
      // UserLink,
      // Pagination,
      // Avatar,
      uri,
    } = this.context

    const {
      // data,
      first,
      response,
      password,
      onPasswordChange,
      useMetamask,
      showRegForm,
    } = this.props

    const {
      resetPasswordId,
      resetPasswordCode,
      resetPasswordInRequest,
      inRequest,
    } = this.state

    let users: AuthFormUsersConnectionUserFragment[] = []
    let count = 0

    /**
     * Если найдено более одного пользователя, требуем уточнения,
     * какой именно пользователь нужен
     */

    let searchForm

    let usersList

    let user

    if (!resetPasswordId) {
      searchForm = this.renderSearchForm()
    }

    const {
      authPage,
    }: {
      authPage?: string | undefined
    } = uri.query(true)

    const page =
      (authPage && typeof authPage === 'string' && parseInt(authPage)) || 1

    if (response) {
      const objectsConnection = response.objectsConnection

      // const first = data.variables?.first

      users = objectsConnection
        ? objectsConnection.edges.map((n: any) => n.node)
        : []
      count = objectsConnection ? objectsConnection.aggregate.count : 0

      if (users.length) {
        if (count === 1) {
          user = users[0]
        } else {
          usersList = (
            <UsersList
              users={users}
              setFilters={this.setFilters}
              lexicon={this.lexicon}
              page={page}
              first={first}
              count={count}
            />
          )
        }
      }
    }

    let userAvatar

    if (user) {
      const { username, fullname, id: userId } = user

      userAvatar = (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar size="big" user={user} />

          <Typography variant="subheading">
            {username || userId} {fullname ? `(${fullname})` : null}
          </Typography>

          <Grid container spacing={8}>
            <Grid item xs={12}></Grid>
          </Grid>
        </div>
      )
    }

    let onSubmit: () => void

    const actions = []

    if (!user) {
      if (useMetamask) {
        actions.push(
          <Button
            key="metamask"
            // color="primary"
            onClick={this.setFormMetamask}
            size="small"
          >
            {this.lexicon('Metamask')}
          </Button>
        )
      }

      if (showRegForm) {
        actions.push(
          <Button
            key="registration"
            // color="primary"
            onClick={this.setFormSignUp}
            size="small"
          >
            {this.lexicon('Signup')}
          </Button>
        )
      }
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

    let mainAction

    if (user) {
      if (resetPasswordId) {
        mainAction = this.renderField(
          <TextField
            fullWidth
            name="code"
            value={resetPasswordCode || ''}
            label={this.lexicon('Code')}
            helperText={this.lexicon('Type confirm code')}
            // type="password"
            // eslint-disable-next-line react/jsx-no-bind
            onChange={(event) => {
              const { value } = event.target

              this.setState({
                resetPasswordCode: value,
              })
            }}
          />
        )

        onSubmit = () => {
          this.resetPassword({
            variables: {
              where: {
                id: userId,
              },
              data: {
                code: resetPasswordCode || '',
              },
            },
          })
        }

        actions.push(
          <Button
            key="submit"
            color="primary"
            type="submit"
            size="small"
            disabled={resetPasswordInRequest ? true : false}
          >
            Сбросить пароль
          </Button>
        )
      } else {
        mainAction = this.renderField(
          <TextField
            fullWidth
            name="password"
            value={password || ''}
            label={this.lexicon('Password')}
            helperText={this.lexicon('Type password')}
            type="password"
            // eslint-disable-next-line react/jsx-no-bind
            onChange={(event) => {
              const { value } = event.target

              onPasswordChange(value)
            }}
          />
        )

        onSubmit = () => {
          this.signin({
            variables: {
              where: {
                id: userId,
              },
              data: {
                password,
              },
            },
          })
        }

        actions.push(
          <Button
            // color="primary"
            key="newPassword"
            size="small"
            // eslint-disable-next-line react/jsx-no-bind
            onClick={async () => {
              const {
                createResetPasswordProcessor = `
                mutation createResetPasswordProcessor(
                  $data:ResetPasswordCreateInput!
                ){
                  response: createResetPasswordProcessor(
                    data:$data
                  ){
                    success
                    message
                    errors{
                      key
                      message
                    }
                    data{
                      id
                      code
                      validTill
                    }
                  }
                }
              `,
              } = this.context.query || {}

              this.mutate({
                mutation: gql(createResetPasswordProcessor),
                variables: {
                  data: {
                    User: {
                      connect: {
                        id: userId,
                      },
                    },
                  },
                },
              }).then((r: any) => {
                const { id: resetPasswordId } =
                  (r.data.response && r.data.response.data) || {}

                if (resetPasswordId) {
                  this.setState({
                    resetPasswordId,
                  })
                }

                return r
              })
            }}
          >
            {this.lexicon('Reset password')}
          </Button>
        )

        actions.push(
          <Button key="submit" color="primary" type="submit" size="small">
            {this.lexicon('Signin')}
          </Button>
        )
      }

      const { id: userId } = user
    }

    const title = this.lexicon('Authorization')

    return (
      <>
        <form
          style={{
            width: '100%',
          }}
          // eslint-disable-next-line react/jsx-no-bind
          onSubmit={(event) => {
            event.preventDefault()

            if (onSubmit) {
              onSubmit()
            }
          }}
        >
          {inRequest ? <LinearProgress /> : null}

          <DialogTitle>{title}</DialogTitle>

          <DialogContent>
            <Grid container spacing={8}>
              <Grid item xs={12}>
                {userAvatar}
              </Grid>

              <Grid item xs={12}>
                {usersList}
              </Grid>

              <Grid item xs={12}>
                {searchForm}
              </Grid>

              <Grid item xs={12}></Grid>

              <Grid item xs={12}>
                {mainAction}
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>{actions}</DialogActions>
        </form>
      </>
    )
  }

  // render(){

  //   console.log('AuthUsers super.render', super.render);

  //   return <>
  //     AuthUsers render
  //   </>
  // }
}

// export default (AuthUsers as unknown) as React.FC<AuthUsersProps>

// export default AuthUsers as unknown as class<T> extends React.Component<AuthUsersProps>;

export default AuthUsers
