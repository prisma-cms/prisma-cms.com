import { ObjectsListViewProps } from 'src/components/view/List/interfaces'
import { ChatRoomsConnectionQuery, Maybe } from 'src/modules/gql/generated'

export interface ChatRoomsViewProps extends ObjectsListViewProps {
  data: Maybe<ChatRoomsConnectionQuery>
}
