import { ObjectsListViewProps } from 'src/components/view/List/interfaces'
import { UsersConnectionUserFragment } from 'src/modules/gql/generated'

export interface UsersViewProps extends ObjectsListViewProps {
  // data: UsersConnectionQuery | null | undefined

  objects: UsersConnectionUserFragment[]
}
