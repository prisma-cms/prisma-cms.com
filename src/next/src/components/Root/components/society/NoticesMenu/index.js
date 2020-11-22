import React from 'react'

import EditorComponent from '@prisma-cms/front-editor/dist/components/App/components/'

import { Notices } from '@prisma-cms/society'

export class NoticesMenu extends EditorComponent {
  static Name = 'NoticesMenu'

  static defaultProps = {
    ...EditorComponent.defaultProps,
  }

  renderPanelView(content) {
    const { classes } = this.getEditorContext()

    return super.renderPanelView(
      content || <div className={classes.panelButton}>NoticesMenu</div>
    )
  }

  getRootElement() {
    return super.getRootElement()
  }

  canBeParent(parent) {
    return super.canBeParent(parent)
  }

  canBeChild() {
    return false
  }

  renderChildren() {
    const { user: currentUser } = this.context

    if (!currentUser) {
      return null
    }

    const { id: currentUserId } = currentUser

    return <Notices key={currentUserId} user={currentUser} classes={{}} />
  }
}

export default NoticesMenu
