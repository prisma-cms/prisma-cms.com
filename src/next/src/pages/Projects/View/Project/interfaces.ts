import {
  ProjectViewProps,
  ProjectViewState,
} from '@prisma-cms/cooperation/lib/components/pages/Projects/View/Project'
import { ProjectsConnectionProjectFragment } from 'src/modules/gql/generated'

export interface ProjectProps extends ProjectViewProps {
  object?: ProjectsConnectionProjectFragment

  classes?: any
}

export interface ProjectState extends ProjectViewState {
  open: boolean

  editMembers: boolean

  openedImage: string | undefined
}
