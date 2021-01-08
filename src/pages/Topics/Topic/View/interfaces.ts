import { EditableObjectProps } from 'apollo-cms/dist/DataView/Object/Editable'
import { Resource_Fragment } from 'src/modules/gql/generated'

export interface TopicViewProps extends EditableObjectProps {
  // data: Maybe<TopicQuery>

  object: Resource_Fragment | undefined

  // classes?: any;

  /**
   * Разрешено ли редактировать блог топика
   */
  canChangeBlog: boolean
}
