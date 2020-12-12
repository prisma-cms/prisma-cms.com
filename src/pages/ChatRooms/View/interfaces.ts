import { ObjectsListViewProps } from 'src/components/view/List/interfaces'
import { ChatRoomsConnectionChatRoomFragment } from 'src/modules/gql/generated'

export interface ChatRoomsViewProps extends ObjectsListViewProps {
  objects: ChatRoomsConnectionChatRoomFragment[]
}
