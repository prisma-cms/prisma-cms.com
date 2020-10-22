import { AuthFormUsersConnectionQueryVariables } from 'src/modules/gql/generated'
import { AuthFormProps } from '../../interfaces'
import AuthUsers from '../AuthUsers'

export type AuthUsersConnectorProps = AuthFormProps & AuthFormUsersConnectionQueryVariables & {
  View?: typeof AuthUsers

  getFilters: () => any

  setFilters: (arg0: any) => any

  cleanFilters: () => void

  password: string

  onPasswordChange: (arg0: any) => any

  useMetamask: boolean

  showRegForm: boolean

  first: number;
  
}
