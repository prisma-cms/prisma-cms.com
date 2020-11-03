import { ObjectsListViewProps } from 'src/components/view/List/interfaces'
import { TechnologiesConnectionQuery, Maybe } from 'src/modules/gql/generated'

export interface TechnologiesViewProps extends ObjectsListViewProps {
  data: Maybe<TechnologiesConnectionQuery>
}
