import {
  ProjectViewProps,
  ProjectViewState,
} from 'src/components/@prisma-cms/cooperation/components/pages/Projects/View/Project'
// import { ProjectsConnectionProjectFragment } from 'src/modules/gql/generated'

export interface ProjectProps extends ProjectViewProps {
  // object: ProjectsConnectionProjectFragment | null | undefined
  // classes?: any
}

export interface ProjectState extends ProjectViewState {
  open: boolean

  editMembers: boolean

  openedImage: string | undefined
}
