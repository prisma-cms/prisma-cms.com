import { ObjectsListViewProps } from 'src/components/view/List/interfaces'
import { Tag_Fragment } from 'src/modules/gql/generated'

export interface TagsViewProps extends ObjectsListViewProps {
  // data: Maybe<TagsConnectionQuery>
  objects: Tag_Fragment[]
}
