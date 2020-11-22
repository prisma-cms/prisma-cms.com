import React from 'react'

import EditorComponent from '@prisma-cms/front-editor/dist/components/App/components/'
import { ObjectContext } from '@prisma-cms/front-editor/dist/components/App/components/public/Connector/ListView'

class TemplateLink extends EditorComponent {
  static Name = 'TemplateLink'

  renderPanelView() {
    const { classes } = this.context

    return super.renderPanelView(
      <div className={classes.panelButton}>TemplateLink</div>
    )
  }

  prepareNewItem() {
    const newItem = super.prepareNewItem()

    Object.assign(newItem, {
      components: [
        {
          name: 'Grid',
          props: {
            container: true,
            alignItems: 'flex-end',
          },
          components: [
            {
              name: 'Grid',
              props: {
                item: true,
                xs: 12,
                sm: true,
              },
              components: [
                {
                  name: 'CreatedBy',
                  props: {},
                  components: [],
                },
              ],
            },
            {
              name: 'Grid',
              props: {
                xs: 12,
                item: true,
              },
              components: [
                {
                  name: 'Typography',
                  props: {},
                  components: [
                    {
                      name: 'NamedField',
                      props: {
                        name: 'name',
                      },
                      components: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    })

    return newItem
  }

  renderChildren() {
    const {
      // TemplateLink: PrismaCmsTemplateLink,
      Link,
    } = this.context

    return (
      <span {...this.getRenderProps()}>
        <ObjectContext.Consumer>
          {(context) => {
            const { object, ...other } = context

            if (!object) {
              return null
            }

            const { id: objectId } = object

            return (
              <Link to={`/?templateId=${objectId}`} {...other}>
                {super.renderChildren()}
              </Link>
            )
          }}
        </ObjectContext.Consumer>
      </span>
    )
  }
}

export default TemplateLink
