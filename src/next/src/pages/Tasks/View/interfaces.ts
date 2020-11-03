import {
  TableViewProps,
  TableViewState,
} from 'apollo-cms/lib/DataView/List/Table'
import {
  TasksConnectionQuery,
  TasksConnectionQueryVariables,
} from 'src/modules/gql/generated'

export interface TasksViewProps extends TableViewProps {
  createTimerProcessor: (data: any) => Promise<void>
  updateTimerProcessor: (data: any) => Promise<void>

  createTaskProcessor: (data: any) => Promise<void>
  updateTaskProcessor: (data: any) => Promise<void>

  deleteTaskReaction: (data: any) => Promise<void>

  classes?: any

  filters?: any

  setFilters(filters: any): void

  data: TasksConnectionQuery | null

  variables?: TasksConnectionQueryVariables

  showAll: boolean

  setShowAll(show: boolean): void
}

export interface TasksViewState extends TableViewState {}
