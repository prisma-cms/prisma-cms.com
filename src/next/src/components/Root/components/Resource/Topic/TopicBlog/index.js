import TopicBlogView from '../../../../../../../pages/Topics/Topic/view/Blog'

import React from 'react'

import EditorComponent from '@prisma-cms/front-editor/lib/components/App/components/'
import { EditableObjectContext } from '@prisma-cms/front-editor/lib/components/App/context'
// import Topic from "../";

export class TopicBlog extends EditorComponent {
  static Name = 'TopicBlog'

  static defaultProps = {
    ...EditorComponent.defaultProps,
  }

  renderPanelView() {
    const { classes } = this.getEditorContext()

    return super.renderPanelView(
      <div className={classes.panelButton}>TopicBlog</div>
    )
  }

  getRootElement() {
    return super.getRootElement()
  }

  // canBeParent(parent) {

  //   return parent instanceof Topic && super.canBeParent(parent);
  // }

  canBeChild() {
    return false
  }

  renderChildren() {
    return (
      <EditableObjectContext.Consumer>
        {(context) => {
          const { updateObject, inEditMode, getObjectWithMutations } = context

          if (!getObjectWithMutations) {
            return null
          }

          const object = getObjectWithMutations()

          if (!object) {
            return null
          }

          return (
            <TopicBlogView
              Topic={object}
              updateObject={updateObject}
              inEditMode={inEditMode}
            />
          )
        }}
      </EditableObjectContext.Consumer>
    )
  }
}

export default TopicBlog
