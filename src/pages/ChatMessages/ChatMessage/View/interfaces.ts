import { ChatMessage_Fragment } from 'src/modules/gql/generated'

export interface ChatMessageViewProps {
  object: ChatMessage_Fragment | null | undefined
}
