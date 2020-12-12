import React from 'react'
import Pagination from 'src/components/Pagination'
import UiChatMessage from 'src/uikit/Chat/ChatMessage'
import { ChatMessagesPageViewProps } from './interfaces'
import { ChatMessagesPageViewStyled } from './styles'

const ChatMessagesPageView: React.FC<ChatMessagesPageViewProps> = (props) => {
  const { objects, limit, page, total } = props

  return (
    <ChatMessagesPageViewStyled>
      {objects.map((n) => {
        return <UiChatMessage key={n.id} object={n} />
      })}

      <Pagination limit={limit} page={page} total={total} />
    </ChatMessagesPageViewStyled>
  )
}

export default ChatMessagesPageView
