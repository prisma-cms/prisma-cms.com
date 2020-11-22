import React from 'react'

import EditorComponent from '@prisma-cms/front-editor/dist/components/App/components/'
import { ObjectContext } from '@prisma-cms/front-editor/dist/components/App/components/public/Connector/ListView'

class TopicLink extends EditorComponent {
  static Name = 'TopicLink'

  renderPanelView() {
    const { classes } = this.context

    return super.renderPanelView(
      <div className={classes.panelButton}>Ссылка на топик</div>
    )
  }

  renderChildren() {
    const { TopicLink: PrismaCmsTopicLink } = this.context

    return (
      <ObjectContext.Consumer>
        {(context) => {
          const { object, ...other } = context

          if (!object) {
            return null
          }

          return (
            <span>
              <PrismaCmsTopicLink object={object} {...other} />
            </span>
          )
        }}
      </ObjectContext.Consumer>
    )
  }
}

export default TopicLink
