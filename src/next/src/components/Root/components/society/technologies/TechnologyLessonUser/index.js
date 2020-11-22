// import './styles.scss'

import React from 'react'

import EditorComponent from '@prisma-cms/front-editor/dist/components/App/components/'
import { ObjectContext } from '@prisma-cms/front-editor/dist/components/App/components/public/Connectors/Connector/ListView'

export class TechnologyLessonUser extends EditorComponent {
  static Name = 'TechnologyLessonUser'

  static defaultProps = {
    ...EditorComponent.defaultProps,
  }

  renderPanelView(content) {
    const { classes } = this.getEditorContext()

    return super.renderPanelView(
      content || <div className={classes.panelButton}>TechnologyLessonUser</div>
    )
  }

  getRootElement() {
    return super.getRootElement()
  }

  canBeParent(parent) {
    return super.canBeParent(parent)
  }

  canBeChild() {
    // return super.canBeChild(child);
    return false
  }

  renderChildren() {
    const { UserLink } = this.context

    // const {
    // } = this.getEditorContext();

    // const {
    //   ...other
    // } = this.getComponentProps(this);

    // return super.renderChildren();

    return (
      <ObjectContext.Consumer key="AcceptTechnologyLesson">
        {(objectContext) => {
          const { object } = objectContext

          const { status, CreatedBy, __typename } = object || {}

          if (__typename !== 'TechnologyLessonUser') {
            console.error('__typename !== TechnologyLessonUser')

            return null
          }

          if (!CreatedBy) {
            return null
          }

          const className = 'TechnologyLessonUser'

          return (
            <div className={className}>
              <span
                className={`${className}--status ${status}`}
                role="img"
                aria-label="status"
              >
                ✅
              </span>
              <UserLink user={CreatedBy} />
            </div>
          )
        }}
      </ObjectContext.Consumer>
    )
  }
}

export default TechnologyLessonUser
