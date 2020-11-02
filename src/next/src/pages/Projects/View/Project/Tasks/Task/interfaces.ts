import { TaskViewProps } from "src/next/src/pages/Tasks/View/Task/interfaces";

export interface TasksTaskViewProps extends TaskViewProps {

  data: {
    object: {
      __typename?: 'Task',
      id?: string
    }
  }
}
