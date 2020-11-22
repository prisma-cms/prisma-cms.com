import React from 'react'

import EditorComponent from '@prisma-cms/front-editor/dist/components/App/components/'
import ResourceFields from '..'

export class ResourceField extends EditorComponent {
  static Name = 'ResourceField'

  static defaultProps = {
    ...EditorComponent.defaultProps,
  }

  renderPanelView(content) {
    const { classes } = this.getEditorContext()

    return super.renderPanelView(
      content || <div className={classes.panelButton}>ResourceField</div>
    )
  }

  canBeParent(parent) {
    return parent instanceof ResourceFields
  }
}

export default ResourceField
