import { TopicsConnectionQueryHookResult } from 'src/modules/gql/generated/topicsConnection'

export type ForumViewPropsData = TopicsConnectionQueryHookResult

export type ForumViewProps = {} & ForumViewPropsData

export type TableViewProps = {
  classes: any
} & ForumViewProps
