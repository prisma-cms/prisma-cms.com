import React, { Component } from 'react'
import PropTypes from 'prop-types'

import EditorComponent from '@prisma-cms/front-editor/lib/components/App/components/'
import { ObjectContext } from '@prisma-cms/front-editor/lib/components/App/components/public/Connector/ListView'

import TemplatePage from '@prisma-cms/front-editor/lib/dev/Renderer/pages/Templates/Template'

import FrontEditor from '@prisma-cms/front-editor/lib/components/App'

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

    const { classes } = this.context

    return super.renderPanelView(
      <div className={classes.panelButton}>Шаблон</div>
    )
  }

  // canBeDropped(dragItem) {

  //   return false;
  // }

  renderChildren() {
    const {
      // Template: PrismaCmsTemplate,
      Link,
    } = this.context

    return (
      <ObjectContext.Consumer>
        {(context) => {
          const { object, ...other } = context

          if (!object) {
            return null

            {
              /* return <FrontEditor
            inEditMode={true}
            data={{
              object: {
                name: "Page",
                props: {
                },
                components: [],
              }
            }}
            _dirty={{
              name: "Page",
              components: [
                {
                  name: "Grid",
                  props: {
                    container: true,
                  },
                  components: [],
                },
              ],
            }}
          />; */
            }
          }

          const { id: objectId, name } = object

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
