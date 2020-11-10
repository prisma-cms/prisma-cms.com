import { TaskViewProps } from 'src/pages/Tasks/View/Task/interfaces'

export interface TasksTaskViewProps extends TaskViewProps {
  data: {
    object: {
      __typename?: 'Task'
      id?: string
    }
  }
}
