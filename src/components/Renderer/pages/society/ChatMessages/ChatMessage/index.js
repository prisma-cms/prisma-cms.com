import React from 'react'

import Page from '../../../layout'

import { ChatMessage } from '@prisma-cms/society'

class ChatMessagePage extends Page {
  render() {
    return super.render(<ChatMessage {...this.props} />)
  }
}

export default ChatMessagePage
