import React, { Fragment } from 'react'

import EditorComponent from '@prisma-cms/front-editor/lib/components/App/components/'
import EditableObject from '@prisma-cms/front-editor/lib/components/App/components/public/form/EditableObject'

export class Resource extends EditorComponent {
  static Name = 'Resource'

  static defaultProps = {
    ...EditorComponent.defaultProps,
    hide_wrapper_in_default_mode: true,
  }

  renderPanelView(content) {
    const { classes } = this.getEditorContext()

    return super.renderPanelView(
      content || <div className={classes.panelButton}>Resource</div>
    )
  }

  getRootElement() {
    return super.getRootElement()
  }

  canBeParent(parent) {
    return (
      super.canBeParent(parent) &&
      this.findInParent(parent, (parent) => parent instanceof EditableObject)
    )
  }

  canBeChild(child) {
    return super.canBeChild(child)
  }
}

export default Resource
