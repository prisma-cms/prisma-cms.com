import { AuthFormProps, AuthFormState } from '../interfaces'

export interface SignupFormProps extends AuthFormProps {
  // open: boolean;

  // loginCanceled: () => void;

  // loginComplete: (arg0: any) => void;

  useMetamask: boolean

  // switchForm: (arg0: any) => void;
}

export interface SignupFormState extends AuthFormState {
  data: any

  signupInRequest: boolean
}
