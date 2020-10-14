import React from 'react'

import EditorComponent from '@prisma-cms/front-editor/lib/components/App/components/'
import { ConnectorContext } from '@prisma-cms/front-editor/lib/components/App/components/public/Connectors/Connector'
import FreeCodeCampRenderer from './Renderer'

export class FreeCodeCamp extends EditorComponent {
  static Name = 'FreeCodeCamp'

  static defaultProps = {
    ...EditorComponent.defaultProps,
  }

  renderPanelView(content) {
    const { classes } = this.getEditorContext()

    return super.renderPanelView(
      content || <div className={classes.panelButton}>FreeCodeCamp</div>
    )
  }

  getRootElement() {
    return super.getRootElement()
  }

  canBeParent(parent) {
    return super.canBeParent(parent)
  }

  canBeChild(child) {
    return super.canBeChild(child)
  }

  renderChildren() {
    // const {
    // } = this.context;

    // const {
    // } = this.getEditorContext();

    // const {
    //   ...other
    // } = this.getComponentProps(this);

    // return super.renderChildren();

    return (
      <ConnectorContext.Consumer key="FreeCodeCamp">
        {(connectorContect) => {
          // console.log('FreeCodeCamp connectorContect', connectorContect);

          const {
            data: { objects: blocks },
          } = connectorContect

          if (!blocks) {
            return blocks
          }

          return <FreeCodeCampRenderer blocks={blocks} />
        }}
      </ConnectorContext.Consumer>
    )
  }
}

export default FreeCodeCamp
