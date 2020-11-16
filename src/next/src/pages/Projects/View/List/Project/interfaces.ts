// import { Project } from "src/modules/gql/generated";
import { ProjectProps } from '../../Project/interfaces'
import { TasksListProps } from '../../Project/Tasks/interfaces'

export interface ProjectsListProjectProps extends ProjectProps {
  // data: {
  //   object: {
  //     __typename?: 'Project'
  //   }
  // }

  tasksLimit: TasksListProps['tasksLimit']

  classes?: any
}
