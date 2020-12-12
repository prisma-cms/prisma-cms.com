import { PaginationProps } from 'src/components/Pagination'
import { ChatMessage_Fragment } from 'src/modules/gql/generated'

export interface ChatMessagesPageViewProps extends PaginationProps {
  objects: ChatMessage_Fragment[]
}
