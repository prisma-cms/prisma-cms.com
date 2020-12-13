import { ObjectsListViewProps } from 'src/components/view/List/interfaces'
import { CodeChallengeBlocksBlockFragment } from 'src/modules/gql/generated'

export interface CodeChallengeBlocksViewProps extends ObjectsListViewProps {
  objects: CodeChallengeBlocksBlockFragment[]
}
