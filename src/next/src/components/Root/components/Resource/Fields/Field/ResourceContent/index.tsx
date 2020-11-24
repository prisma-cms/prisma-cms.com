// import { EditableObjectContext } from '@prisma-cms/front-editor/dist/components/App/context';
import RichText from '@prisma-cms/front-editor/dist/components/Connectors/Connector/Fields/RichText'
// import { ObjectContext } from '@prisma-cms/front-editor/dist/components/Connectors/Connector/ListView';
// import ResourceField from '..';

export class RichTextCustom extends RichText {
  defaultProps = RichText.defaultProps

  renderAddButton() {
    return super.renderAddButton('Текстовый блок')
  }
}

class ResourceContent extends RichTextCustom {
  static Name = 'ResourceContent'

  renderPanelView() {
    return null
  }

  renderAddButton() {
    return null
  }
}

export default ResourceContent
