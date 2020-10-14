import React from 'react'

import EditorComponent from '@prisma-cms/front-editor/lib/components/App/components/'

import View from 'material-ui-icons/RemoveRedEye'

export class ViewIcon extends EditorComponent {
  static Name = 'ViewIcon'

  static defaultProps = {
    ...EditorComponent.defaultProps,
    style: {
      ...EditorComponent.defaultProps.style,
      fontSize: 24,
    },
  }

  renderPanelView(content) {
    const { classes } = this.getEditorContext()

    return super.renderPanelView(
      content || <div className={classes.panelButton}>ViewIcon</div>
    )
  }

  getRootElement() {
    return View
  }

  canBeParent(parent) {
    return super.canBeParent(parent)
  }

  canBeChild(child) {
    // return super.canBeChild(child);
    return false
  }

  // renderChildren() {

  //   const {
  //   } = this.context;

  //   const {
  //   } = this.getEditorContext();

  //   const {
  //     ...other
  //   } = this.getComponentProps(this);

  //   return super.renderChildren();
  // }
}

export default ViewIcon
