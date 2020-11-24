import React from 'react'

import { EditorComponent } from '@prisma-cms/front-editor'
import { ObjectContext } from '@prisma-cms/front-editor/dist/components/Connectors/Connector/ListView'

import { Link } from 'react-router-dom'

class SwitchTemplateLink extends EditorComponent {
  static defaultProps = {
    ...EditorComponent.defaultProps,
  }

  static Name = 'SwitchTemplateLink'

  renderPanelView() {
    const { classes } = this.getEditorContext()

    return super.renderPanelView(
      <div className={classes.panelButton}>Switch Template</div>
    )
  }

  // getRootElement() {

  //   return MainMenu;
  // }

  prepareDragItemComponents() {
    return super.prepareDragItemComponents().concat([
      {
        name: 'NamedField',
        props: {
          name: 'name',
        },
        components: [],
      },
    ])
  }

  renderChildren() {
    return (
      <ObjectContext.Consumer>
        {(context) => {
          const { object } = context

          const children = super.renderChildren()

          const { id: templateId } = object || {}

          if (templateId) {
            return (
              <Link
                to={`/?templateId=${templateId}`}
                // onClick={event => {

                //   const {
                //     localStorage,
                //   } = global;

                //   if (localStorage && localStorage.setItem) {
                //     localStorage.setItem("PrismaCmsTemplateId", templateId);
                //   }

                // }}
              >
                {children}
              </Link>
            )
          } else {
            return children
          }
        }}
      </ObjectContext.Consumer>
    )
  }

  // renderMainView() {

  //   // const {
  //   //   marginTop,
  //   //   marginBottom,
  //   // } = this.getComponentProps(this);

  //   const {
  //     style,
  //     marginTop,
  //     marginBottom,
  //     ...other
  //   } = this.getRenderProps();

  //   return <div
  //     style={{
  //       marginTop,
  //       marginBottom,
  //       ...style,
  //     }}
  //     {...other}
  //   >
  //     {super.renderMainView()}
  //   </div>;
  // }
}

export default SwitchTemplateLink
