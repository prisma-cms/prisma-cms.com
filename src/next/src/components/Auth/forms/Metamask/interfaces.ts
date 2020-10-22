import { AuthFormProps, AuthFormState } from '../interfaces'

export type AuthUsersConnectorProps = {
  View: any

  where?: any

  // Renderer: any;
}

export interface MetamaskFormProps extends AuthFormProps {}

export interface MetamaskFormState extends AuthFormState {
  data: any

  signupInRequest: boolean
}
