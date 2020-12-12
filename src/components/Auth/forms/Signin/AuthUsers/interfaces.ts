import { AuthFormUsersConnectionQuery, Maybe } from 'src/modules/gql/generated'
import { AuthFormProps, AuthFormState } from '../../interfaces'

export interface AuthUsersProps extends AuthFormProps {
  // data: AuthFormUsersConnectionQueryHookResult | undefined

  response: Maybe<AuthFormUsersConnectionQuery>

  first: number

  getFilters: () => any

  setFilters: (arg0: any) => any

  cleanFilters: () => void

  password: string

  onPasswordChange: (arg0: any) => any

  useMetamask: boolean

  showRegForm: boolean
}

export interface AuthUsersState extends AuthFormState {
  resetPasswordInRequest: boolean

  resetPasswordId: string | null

  resetPasswordCode: string | null
}
