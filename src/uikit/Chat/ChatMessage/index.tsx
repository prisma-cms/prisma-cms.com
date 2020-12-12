import React from 'react'
import moment from 'moment'
import Editor from 'src/uikit/Editor'
import Grid from 'src/uikit/Grid'
import ChatRoomLink from 'src/uikit/Link/ChatRoom'
import UikitUserLink from 'src/uikit/Link/User'
import { UiChatMessageProps } from './interfaces'
import { UiChatMessageStyled } from './styles'
import Link from 'next/link'

export * from './interfaces'

const UiChatMessage: React.FC<UiChatMessageProps> = (props) => {
  const object = props.object

  if (!object) {
    return null
  }

  const { id, createdAt, CreatedBy, content, Room } = object

  return (
    <UiChatMessageStyled>
      <Grid container spacing={8} alignItems="center">
        <Grid item>
          <UikitUserLink user={CreatedBy} showName={false} />
        </Grid>

        <Grid item xs>
          <Grid container spacing={8} alignItems="center">
            <Grid item>
              <UikitUserLink user={CreatedBy} withAvatar={false} />
            </Grid>
            <Grid item xs>
              {id && createdAt ? (
                <Link href={`/chat-messages/${id}`}>
                  {moment(createdAt).format('lll')}
                </Link>
              ) : null}
            </Grid>
            <Grid item>{Room ? <ChatRoomLink object={Room} /> : null}</Grid>
          </Grid>

          <Editor editorKey="chat-message-editor" value={content} />
        </Grid>
      </Grid>
    </UiChatMessageStyled>
  )
}

export default UiChatMessage
