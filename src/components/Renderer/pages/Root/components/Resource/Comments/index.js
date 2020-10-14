import React, { Fragment } from 'react'

import EditorComponent from '@prisma-cms/front-editor/lib/components/App/components/'
import Resource from '..'
import { ObjectContext } from '@prisma-cms/front-editor/lib/components/App/components/public/Connectors/Connector/ListView'
import TopicComments from '../../../../../../pages/Topics/Topic/view/Comments'

export class Comments extends EditorComponent {
  static Name = 'Comments'

  static defaultProps = {
    ...EditorComponent.defaultProps,
  }

  renderPanelView() {
    const { classes } = this.getEditorContext()

    return super.renderPanelView(
      <div className={classes.panelButton}>Comments</div>
    )
  }

  getRootElement() {
    return super.getRootElement()
  }

  canBeParent(parent) {
    return parent instanceof Resource && super.canBeParent(parent)
  }

  canBeChild(child) {
    return false
  }

  renderChildren() {
    return (
      <ObjectContext.Consumer>
        {(objectContext) => {
          const { object } = objectContext

          return object ? <TopicComments topic={object} /> : null
        }}
      </ObjectContext.Consumer>
    )
  }
}

export default Comments
