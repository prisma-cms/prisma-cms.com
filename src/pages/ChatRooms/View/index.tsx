import React from 'react'
import { ObjectsListView, styles } from 'src/components/view/List'

import withStyles from 'material-ui/styles/withStyles'
import { ChatRoomsViewProps } from './interfaces'
import { ColumnConfig } from 'apollo-cms/dist/DataView/List/Table'
import { ChatRoomsConnectionChatRoomFragment } from 'src/modules/gql/generated'
import UserLink from 'src/uikit/Link/User'
import Grid from 'src/uikit/Grid'
import { UikitUserLinkAvatarSize } from 'src/uikit/Link/User/interfaces'
import ChatRoomLink from 'src/uikit/Link/ChatRoom'

class ChatRoomsView<
  P extends ChatRoomsViewProps = ChatRoomsViewProps
> extends ObjectsListView<P> {
  static defaultProps = {
    ...ObjectsListView.defaultProps,
    title: 'Чат-комнаты',
  }

  getColumns<
    CC extends ChatRoomsConnectionChatRoomFragment
  >(): ColumnConfig<CC>[] {
    return [
      {
        id: 'name',
        key: 'name',
        label: 'Название комнаты',
        renderer: (_value, record) => {
          return <ChatRoomLink object={record} />
        },
      },
      {
        id: 'code',
        key: 'code',
        label: 'Уникальный код',
      },
      {
        id: 'CreatedBy',
        key: 'CreatedBy',
        label: 'Владелец',
        renderer: (value: CC['CreatedBy']) => {
          return <UserLink user={value} />
        },
      },
      {
        id: 'Members',
        key: 'Members',
        label: 'Участники',
        renderer: (value: CC['Members']) => {
          const items =
            value?.map((n) => (
              <Grid key={n.id} item>
                <UserLink
                  user={n}
                  showName={false}
                  size={UikitUserLinkAvatarSize.small}
                />
              </Grid>
            )) ?? []

          return (
            <Grid container spacing={8}>
              {items}
            </Grid>
          )
        },
      },
      {
        id: 'Invitations',
        key: 'Invitations',
        label: 'Приглашенные',
        renderer: (value: CC['Invitations']) => {
          const items =
            value?.map((n) => (
              <Grid key={n.id} item>
                <UserLink
                  user={n.User}
                  showName={false}
                  size={UikitUserLinkAvatarSize.small}
                />
              </Grid>
            )) ?? []

          return (
            <Grid container spacing={8}>
              {items}
            </Grid>
          )
        },
      },
    ]
  }
}

export default withStyles(styles)((props: ChatRoomsViewProps) => (
  <ChatRoomsView {...props} />
))
