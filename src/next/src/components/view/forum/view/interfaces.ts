import {
  // Maybe,
  // TopicsConnectionQuery,
  TopicsConnectionQueryHookResult,
} from 'src/modules/gql/generated'
import { ObjectsListViewProps } from '../../List/interfaces'

// export type ForumViewPropsData = TopicsConnectionQueryHookResult["data"];

/**
 * Пропсы для компонента вывода топиков
 */
export interface ForumViewProps extends ObjectsListViewProps {
  // data: Maybe<TopicsConnectionQuery>

  variables?: TopicsConnectionQueryHookResult['variables']

  classes?: any
}
