import { ObjectsListViewProps } from 'src/components/view/List/interfaces'
import { BlogsConnectionResourceFragment } from 'src/modules/gql/generated'

export interface BlogsViewProps extends ObjectsListViewProps {
  objects: BlogsConnectionResourceFragment[]
}
