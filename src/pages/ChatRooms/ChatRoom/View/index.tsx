import React from 'react'
import Typography from 'material-ui/Typography'
import { ChatRoomViewProps } from './interfaces'
import { ChatRoomViewStyled } from './styles'
import Grid from 'src/uikit/Grid'
import UikitUserLink, { UikitUserLinkAvatarSize } from 'src/uikit/Link/User'
import UiChatMessage from 'src/uikit/Chat/ChatMessage'

const ChatRoomView: React.FC<ChatRoomViewProps> = (props) => {
  const chatRoom = props.object

  if (!chatRoom) {
    return null
  }

  const {
    name,
    // CreatedBy,
    Members,
    Messages,
  } = chatRoom

  return (
    <ChatRoomViewStyled>
      <Grid container spacing={8} alignItems="flex-start">
        <Grid item xs>
          <Typography variant="title">{name}</Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={8}>
            {Members?.map((n) => {
              return (
                <Grid key={n.id} item>
                  <UikitUserLink
                    showName={false}
                    size={UikitUserLinkAvatarSize.small}
                    user={n}
                  />
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      </Grid>

      <div className="chat-room--messages">
        {Messages?.map((n) => {
          return <UiChatMessage key={n.id} object={n} />
        })}
      </div>
    </ChatRoomViewStyled>
  )
}

export default ChatRoomView
