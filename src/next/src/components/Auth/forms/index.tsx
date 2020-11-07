import React from 'react'
import PropTypes from 'prop-types'

import Dialog from 'material-ui/Dialog' // DialogContent, // DialogActions,

import PrismaCmsComponent from '@prisma-cms/component'
import { AuthFormProps, AuthFormState } from './interfaces'
import { SigninMutationResult } from 'src/modules/gql/generated'
// import { PrismaCmsContext } from 'src/next/src/pages/_App/interfaces';

const defaultLocales = {
  ru: {
    values: {
      Authorization: 'Авторизация',
      'Login, email, phone or user ID':
        'Логин, емейл, телефон или ID пользователя',
      'Choose user from list': 'Выберите пользователя из списка',
      'Type confirm code': 'Введите код подтверждения',
      'Type password': 'Введите свой пароль',
      Login: 'Логин',
      Email: 'Емейл',
      Phone: 'Телефон',
      Fullname: 'Полное имя',
      Password: 'Пароль',
      Signin: 'Авторизоваться',
      Signup: 'Регистрация',
      Cancel: 'Отмена',
      'Reset password': 'Новый пароль',
      Code: 'Код',
    },
  },
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
// interface AuthForm<P = {}, S = {foo: string}> extends PrismaCmsComponent<P & AuthFormProps, S & AuthFormState> {

// }

class AuthForm<
  P extends AuthFormProps,
  S extends AuthFormState
  > extends PrismaCmsComponent<P, S> {
  // context!: PrismaCmsContext;

  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    open: PropTypes.bool.isRequired,
    fullWidth: PropTypes.bool,
    maxWidth: PropTypes.string,
    dialogProps: PropTypes.object,
    loginCanceled: PropTypes.func.isRequired,
    switchForm: PropTypes.func.isRequired,
  }

  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    open: true,
    fullWidth: true,
    maxWidth: 'xs',
    locales: defaultLocales,
  }

  constructor(props: P) {
    super(props)
    this.onRequestClose = this.onRequestClose.bind(this);
  }

  lexicon = (word: string, options?: any) => {
    return super.lexicon(word, options)
  }

  renderForm(): JSX.Element | null {
    return null
  }

  // renderActions() {

  //   return [];
  // }

  // getSubmit() {

  // }

  onRequestClose() {
    const { loginCanceled } = this.props

    return loginCanceled()
  }

  closeForm = () => {
    const {
      // cleanFilters,
      loginCanceled,
    } = this.props

    this.cleanForm()

    loginCanceled()
  }

  cleanForm() {
    return
  }

  switchForm(form: string) {
    const { switchForm } = this.props

    // this.cleanForm();

    return switchForm(form)
  }

  setFormSignUp = () => {
    this.switchForm('signup')
  }

  async onAuth(result: SigninMutationResult) {
    const { response } = (result && result.data) || {}

    const {
      success,
      // message,
      // errors: responseErrors,
      token,
      data: user,
    } = response || {}

    if (success && token && user) {
      const { loginComplete } = this.props

      await loginComplete({
        token,
        user,
      })
    }

    this.closeForm()

    return result
  }

  mutate(params: any) {
    this.setState({
      inRequest: true,
    })

    return super
      .mutate(params)
      .then((result: any) => {
        this.setState({
          inRequest: false,
        })

        return result
      })
      .catch((error: Error) => {
        this.setState({
          inRequest: false,
        })

        throw error
      })
  }

  render() {
    const {
      fullWidth,
      maxWidth,
      open,
      dialogProps,
      // classes,
      // step,
      // ...other
    } = this.props

    return super.render(
      <Dialog
        // onEntering={this.handleEntering}
        {...dialogProps}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={this.onRequestClose}
      >
        {this.renderForm()}
      </Dialog>
    )
  }
}

// export default AuthForm as unknown as React.Component<any, any>;
export default AuthForm
