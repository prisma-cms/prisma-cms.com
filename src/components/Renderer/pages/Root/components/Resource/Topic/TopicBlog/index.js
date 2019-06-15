
import TopicBlogView from "../../../../../../../pages/Topics/Topic/view/Blog";

import React from 'react';

import EditorComponent from '@prisma-cms/front-editor/lib/components/App/components/';
import { EditableObjectContext } from "@prisma-cms/front-editor/lib/components/App/context";
// import Topic from "../";

export class TopicBlog extends EditorComponent {

  static Name = 'TopicBlog';

  static defaultProps = {
    ...EditorComponent.defaultProps,
  }


  renderPanelView() {

    const {
      classes,
    } = this.getEditorContext();

    return super.renderPanelView(
      <div
        className={classes.panelButton}
      >
        TopicBlog
      </div>
    );
  }


  getRootElement() {

    return super.getRootElement();
  }


  // canBeParent(parent) {

  //   return parent instanceof Topic && super.canBeParent(parent);
  // }


  canBeChild(child) {

    return false;
  }


  renderChildren() {

    const {
    } = this.context;

    const {
    } = this.getEditorContext();

    const {
      ...other
    } = this.getComponentProps(this);

    return <EditableObjectContext.Consumer>
      {context => {

        const {
          getEditor,
          updateObject,
          inEditMode,
          getObjectWithMutations,
        } = context;


        if (!getObjectWithMutations) {
          return null;
        }


        const object = getObjectWithMutations();


        if (!object) {
          return null;
        }


        return <TopicBlogView
          Topic={object}
          updateObject={data => updateObject(data)}
          inEditMode={inEditMode}
        />;

      }}
    </EditableObjectContext.Consumer>
  }

}

export default TopicBlog;
