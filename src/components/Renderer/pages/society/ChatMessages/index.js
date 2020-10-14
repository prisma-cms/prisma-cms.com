import React from 'react'

import Page from '../../layout'

import { ChatMessages } from '@prisma-cms/society'

class ChatMessagesPage extends Page {
  setPageMeta() {
    return super.setPageMeta({
      title: 'Сообщения в чатах',
    })
  }

  render() {
    return super.render(<ChatMessages {...this.props} />)
  }
}

export default ChatMessagesPage
