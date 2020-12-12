import { ObjectsListViewProps } from 'src/components/view/List/interfaces'
import { TimersConnectionTimerFragment } from 'src/modules/gql/generated'

export interface TimersViewProps extends ObjectsListViewProps {
  // data: Maybe<TimersConnectionQuery>
  objects: TimersConnectionTimerFragment[]
}
