import React, { Component } from 'react'

import Link from '..'

import { ChatRoomLinkProps } from './interfaces'

export class ChatRoomLink extends Component<ChatRoomLinkProps> {
  render() {
    const { object, ...other } = this.props

    if (!object) {
      return null
    }

    const { id, name } = object

    if (!id) {
      return null
    }

    return (
      <Link href={`/chat-rooms/${id}`} title={name} {...other}>
        {name}
      </Link>
    )
  }
}

export default ChatRoomLink
