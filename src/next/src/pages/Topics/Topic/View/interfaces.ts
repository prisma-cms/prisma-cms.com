import { EditableObjectProps } from 'apollo-cms/dist/DataView/Object/Editable'
import { TopicObjectFragment } from 'src/modules/gql/generated'

export interface TopicViewProps extends EditableObjectProps {
  // data: Maybe<TopicQuery>

  object: TopicObjectFragment

  // classes?: any;
}
