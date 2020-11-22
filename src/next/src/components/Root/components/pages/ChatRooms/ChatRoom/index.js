import React from 'react'

import EditorComponent from '@prisma-cms/front-editor/dist/components/App/components/'
import ChatRoomView from '@prisma-cms/webrtc/lib/components/pages/society/ChatRooms/ChatRoom/View'
import { EditableObjectContext } from '@prisma-cms/front-editor/dist/components/App/context'

export class ChatRoom extends EditorComponent {
  static Name = 'ChatRoom'

  static defaultProps = {
    ...EditorComponent.defaultProps,
  }

  renderPanelView(content) {
    const { classes } = this.getEditorContext()

    return super.renderPanelView(
      content || <div className={classes.panelButton}>ChatRoom</div>
    )
  }

  getRootElement() {
    return super.getRootElement()
  }

  canBeParent(parent) {
    return super.canBeParent(parent)
  }

  canBeChild(child) {
    return super.canBeChild(child)
  }

  renderChildren() {
    return (
      <EditableObjectContext.Consumer>
        {(objectContext) => {
          const { object, ...otherContext } = objectContext

          return (
            <ChatRoomView
              {...otherContext}
              data={{
                object: object,
              }}
            />
          )
        }}
      </EditableObjectContext.Consumer>
    )
  }
}

export default ChatRoom
