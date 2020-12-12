import React from 'react'
import { ChatMessageViewProps } from './interfaces'
import { ChatMessageViewStyled } from './styles'
import UiChatMessage from 'src/uikit/Chat/ChatMessage'
import Link from 'next/link'

const ChatMessageView: React.FC<ChatMessageViewProps> = (props) => {
  const chatMessage = props.object

  if (!chatMessage) {
    return null
  }

  return (
    <ChatMessageViewStyled>
      <UiChatMessage object={chatMessage} />
      <Link href="/chat-messages">
        <a className="chat-message--all-messages-link">Все сообщения</a>
      </Link>
    </ChatMessageViewStyled>
  )
}

export default ChatMessageView
