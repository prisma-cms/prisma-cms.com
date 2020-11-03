/**
 * Форма ввода пароля или сброса выводится только тогда, когда найден конкретный пользователь.
 * Пока он не найден, выводится форма для поиска пользователя.
 * Когда пользователь найден, тогда переходим к нему и выбираем.
 */

import React from 'react'
import PropTypes from 'prop-types'

import PrismaCmsComponent from '@prisma-cms/component'

import SigninForm from './forms/Signin'
import SignupForm from './forms/Signup'
import MetamaskForm from './forms/Metamask'

// import Dialog, {
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from 'material-ui/Dialog';
// import Button from 'material-ui/Button';

import { AuthProps, AuthState } from './interfaces'

class Auth extends PrismaCmsComponent<AuthProps, AuthState> {
  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    loginCanceled: PropTypes.func.isRequired,
    loginComplete: PropTypes.func.isRequired,

    step: PropTypes.oneOf([
      // "findUser",
      'signin',
      'signup',
    ]).isRequired,

    // classes: PropTypes.object.isRequired,
    useMetamask: PropTypes.bool.isRequired,
    showRegForm: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    step: 'signin',
    showRegForm: true,
    allowPasswordRecovery: true,
    first: 2,
    fullWidth: true,
    maxWidth: 'xs',
    useMetamask: true,
  }

  constructor(props: Auth['props']) {
    super(props)

    const { step = Auth.defaultProps.step } = props

    this.state = {
      ...this.state,
      step,
    }
  }

  renderForm() {
    const { step } = this.state

    let form = null

    switch (step) {
      // case "findUser":
      case 'signin':
        form = this.renderSigninForm()
        break

      case 'signup':
        form = this.renderSignupForm()
        break

      case 'metamask':
        form = this.renderMetamaskForm()
        break
    }

    return form
  }

  switchForm = (form: string) => {
    this.setState({
      step: form,
    })
  }

  renderSigninForm() {
    const {
      open,
      loginCanceled,
      loginComplete,
      showRegForm,
      useMetamask,
    } = this.props

    return (
      <SigninForm
        open={open}
        loginCanceled={loginCanceled}
        loginComplete={loginComplete}
        useMetamask={useMetamask}
        showRegForm={showRegForm}
        switchForm={this.switchForm}
      />
    )
  }

  renderSignupForm() {
    const { open, loginCanceled, loginComplete, useMetamask } = this.props

    return (
      <SignupForm
        open={open}
        loginCanceled={loginCanceled}
        loginComplete={loginComplete}
        useMetamask={useMetamask}
        switchForm={(form) => {
          this.setState({
            step: form,
          })
        }}
      />
    )
  }

  renderMetamaskForm() {
    const { open, loginCanceled, loginComplete, useMetamask } = this.props

    return (
      <MetamaskForm
        open={open}
        loginCanceled={loginCanceled}
        loginComplete={loginComplete}
        useMetamask={useMetamask}
        switchForm={(form) => {
          this.setState({
            step: form,
          })
        }}
      />
    )
  }

  getFilters(): any | null {
    const { uri } = this.context

    let { authFilters: filters } = uri.query(true)

    if (filters && typeof filters === 'string') {
      try {
        filters = (filters && JSON.parse(filters)) || null
      } catch (error) {
        console.error(console.error(error))
      }
    }

    return filters
  }

  setFilters(filters: any) {
    const { uri, router } = this.context

    let newUri = uri.clone()

    const currentFilters = this.getFilters()

    filters = {
      ...currentFilters,
      ...filters,
    }

    try {
      filters = filters ? JSON.stringify(filters) : undefined
    } catch (error) {
      console.error(error)
    }

    if (filters === '{}') {
      filters = undefined
    }

    if (filters) {
      // if (newUri.hasQuery) {
      newUri = newUri.setQuery({
        authFilters: filters,
      })
      // }
      // else {
      //   newUri = newUri.addQuery({
      //     filters,
      //   });
      // }
    } else {
      newUri.removeQuery('authFilters')
    }

    newUri.removeQuery('authPage')

    const url = newUri.resource()

    router.push(url)
  }

  cleanFilters() {
    const { uri, router } = this.context

    const newUri = uri.clone()

    newUri.removeQuery('authPage')
    newUri.removeQuery('authFilters')

    const url = newUri.resource()

    router.push(url)
  }

  prepareWhere() {
    const {
      // search,
      where,
    } = this.getFilters() || {}

    // let where;

    // if (search) {

    //   where = {
    //     OR: [
    //       {
    //         id: search,
    //       },
    //       {
    //         username_contains: search,
    //       },
    //       {
    //         email_contains: search,
    //       },
    //       {
    //         fullname_contains: search,
    //       },
    //       {
    //         phone_contains: search,
    //       },
    //     ],
    //   };

    // }

    return where
  }

  // renderActions() {

  //   return <Fragment>
  //     <Button
  //       onClick={this.handleClose}
  //     // color="primary"
  //     >
  //       Регистрация
  //     </Button>
  //     <Button
  //       onClick={this.handleClose}
  //     // color="primary"
  //     >
  //       Отмена
  //     </Button>
  //     <Button
  //       onClick={this.handleClose}
  //       color="primary"
  //       autoFocus
  //     >
  //       Agree
  //     </Button>
  //   </Fragment>
  // }

  render() {
    return this.renderForm() || null
  }
}

// const AuthExtended = (Auth as unknown) as React.FC<AuthProps>

// export default (withStyles(styles)((props: AuthProps) => (
//   <AuthExtended {...props} />
// )) as unknown) as React.FC<AuthProps>

export default Auth
