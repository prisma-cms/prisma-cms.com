import React from 'react'

import EditorComponent from '@prisma-cms/front-editor/dist/components/App/components/'
import { ObjectContext } from '@prisma-cms/front-editor/dist/components/App/components/public/Connectors/Connector/ListView'
import CodeChallengeRenderer from './Renderer'

export class CodeChallenge extends EditorComponent {
  static Name = 'CodeChallenge'

  static defaultProps = {
    ...EditorComponent.defaultProps,
    hide_wrapper_in_default_mode: true,
  }

  renderPanelView(content) {
    const { classes } = this.getEditorContext()

    return super.renderPanelView(
      content || <div className={classes.panelButton}>CodeChallenge</div>
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
      <ObjectContext.Consumer key="CodeChallenge">
        {(objectContext) => {
          // console.log('CodeChallengeRenderer objectContext', objectContext);

          const { object } = objectContext

          return object ? <CodeChallengeRenderer object={object} /> : null
        }}
      </ObjectContext.Consumer>
    )
  }
}

export default CodeChallenge
