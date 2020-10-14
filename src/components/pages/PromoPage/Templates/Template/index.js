import React from 'react'

import EditorComponent from '@prisma-cms/front-editor/lib/components/App/components/'
import { ObjectContext } from '@prisma-cms/front-editor/lib/components/App/components/public/Connector/ListView'

import TemplatePage from '@prisma-cms/front-editor/lib/dev/Renderer/pages/Templates/Template'

class Template extends EditorComponent {
  static Name = 'Template'

  static defaultProps = {
    ...EditorComponent.defaultProps,
    style: {
      width: '100%',
    },
  }

  renderPanelView() {
    return null
  }

  // canBeDropped(dragItem) {

  //   return false;
  // }

  renderChildren() {
    return (
      <ObjectContext.Consumer>
        {(context) => {
          const { object } = context

          if (!object) {
            return null
          }

          const { id: objectId } = object

          if (!objectId) {
            return null
          }

          return (
            <TemplatePage
              where={{
                id: objectId,
              }}
            />
          )
        }}
      </ObjectContext.Consumer>
    )
  }
}

export default Template
