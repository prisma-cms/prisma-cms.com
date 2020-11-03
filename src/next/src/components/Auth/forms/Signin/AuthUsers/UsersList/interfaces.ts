import PrismaCmsComponent from '@prisma-cms/component'
import { AuthFormUsersConnectionUserFragment } from 'src/modules/gql/generated'
import { AuthUsersProps } from '../interfaces'

export interface UsersListProps {
  users: AuthFormUsersConnectionUserFragment[]

  setFilters: AuthUsersProps['setFilters']

  lexicon: PrismaCmsComponent['lexicon']

  page: number

  first: number

  count: number
}
