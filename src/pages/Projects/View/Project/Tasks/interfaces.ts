export interface TasksListProps {
  tasksLimit?: number

  tasks: {
    __typename?: 'Task'
    id: string
    name: string
  }[]
}
