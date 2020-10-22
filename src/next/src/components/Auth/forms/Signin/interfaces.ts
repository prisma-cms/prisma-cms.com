import { AuthFormProps, AuthFormState } from '../interfaces'

export interface AuthUsersFormProps extends AuthFormProps {
  open: boolean

  // loginCanceled: () => void;

  // loginComplete: (arg0: any) => void;

  useMetamask: boolean

  showRegForm: boolean

  switchForm: (arg0: string) => void

  first?: number
}

export interface AuthUsersFormState extends AuthFormState {
  password: string
}
