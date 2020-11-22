// import { EditableObjectContext } from '@prisma-cms/front-editor/dist/components/App/context';
import RichText from '@prisma-cms/front-editor/dist/components/App/components/public/Connectors/Connector/Fields/RichText'
// import { ObjectContext } from '@prisma-cms/front-editor/dist/components/App/components/public/Connectors/Connector/ListView';
// import ResourceField from '..';

export class RichTextCustom extends RichText {
  renderAddButton() {
    return super.renderAddButton('Текстовый блок')
  }
}

class ResourceContent extends RichTextCustom {
  // static defaultProps = {
  //   ...ResourceField.defaultProps,
  //   label: undefined,
  //   helperText: undefined,
  //   // readOnly: true,
  // }

  static Name = 'ResourceContent'

  // onBeforeDrop = () => {

  // }

  // canBeDropped = (dragItem) => {
  //   return false;
  // }

  // renderPanelView(content) {

  //   const {
  //     classes,
  //   } = this.getEditorContext();

  //   return super.renderPanelView(content || <div
  //     className={classes.panelResourceContent}
  //   >
  //     ResourceContent
  //   </div>);
  // }

  renderPanelView() {
    return null
  }

  renderAddButton() {
    return null
  }

  // canBeParent(parent) {

  //   return true;
  // }

  // canBeChild(child) {
  //   return false;
  // }

  // renderChildren() {

  //   const {
  //     Editor,
  //   } = this.context;

  //   const {
  //     content,
  //   } = this.getComponentProps(this);

  //   const {
  //     activeItem,
  //     inEditMode,
  //   } = this.getEditorContext();

  //   const isActive = activeItem === this;

  //   const readOnly = !inEditMode || !isActive ? true : false;

  //   return <Editor
  //     value={content}
  //     readOnly={readOnly}
  //     onChange={!readOnly ? value => {

  //       this.updateComponentProps({
  //         content: value,
  //       });

  //     } : undefined}
  //   />

  //   return <EditableObjectContext.Consumer>
  //     {context => {

  //       const {
  //         getEditor,
  //         updateObject,
  //         inEditMode,
  //         getObjectWithMutations,
  //       } = context;

  //       if (!getObjectWithMutations) {
  //         return null;
  //       }

  //       const object = getObjectWithMutations();

  //       if (!object) {
  //         return null;
  //       }

  //       const {
  //         activeItem,
  //       } = this.getEditorContext();

  //       const isActive = activeItem === this;

  //       const readOnly = !inEditMode || !isActive ? true : false;

  //       {/* console.log("ResourceContent content", JSON.stringify(content, true, 2));
  //       console.log("ResourceContent isActive", isActive); */}

  //       {/* const {
  //         id: objectId,
  //       } = object || {}; */}

  //       return getEditor ? getEditor({
  //         ...this.getComponentProps(this),
  //         Editor,
  //         readOnly,
  //         value: content,
  //         onChange: isActive ? value => {

  //           this.updateComponentProps({
  //             content: value,
  //           });

  //           {/* const {
  //             components,
  //           } = getObjectWithMutations();

  //           updateObject({
  //             components,
  //           }); */}

  //         } : undefined
  //       }) : super.renderChildren();

  //     }}
  //   </EditableObjectContext.Consumer>

  // }
}

export default ResourceContent
