import React from 'react'
import { ObjectsListView, styles } from 'src/components/view/List'

import withStyles from 'material-ui/styles/withStyles'
import { ChatRoomsViewProps } from './interfaces'
import { ColumnConfig } from 'apollo-cms/dist/DataView/List/Table'
import { ChatRoomsConnectionChatRoomFragment } from 'src/modules/gql/generated'
import UserLink from 'src/components/ui/Link/User'
import Grid from 'src/components/ui/Grid'
import { UserLinkAvatarSize } from 'src/components/ui/Link/User/interfaces'
import ChatRoomLink from 'src/components/ui/Link/ChatRoom'

class ChatRoomsView<
  P extends ChatRoomsViewProps = ChatRoomsViewProps
> extends ObjectsListView<P> {
  static defaultProps = {
    ...ObjectsListView.defaultProps,
    title: 'Чат-комнаты',
  }

  getColumns<CC extends ChatRoomsConnectionChatRoomFragment>(): ColumnConfig<
    CC
  >[] {
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
        label: 'Кто использует',
        renderer: (value: CC['Members']) => {
          const items =
            value?.map((n) => (
              <Grid key={n.id} item>
                <UserLink
                  user={n}
                  showName={false}
                  size={UserLinkAvatarSize.small}
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
                  size={UserLinkAvatarSize.small}
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
