import {
  EditableObjectProps,
  EditableObjectState,
} from 'apollo-cms/dist/DataView/Object/Editable'
import { ProjectsConnectionProjectFragment } from 'src/modules/gql/generated'

export interface ProjectViewProps extends EditableObjectProps {
  object: ProjectsConnectionProjectFragment | null | undefined

  classes?: Record<string, any>
}

export interface ProjectViewState extends EditableObjectState {}

// export class ProjectView<
//   P extends ProjectViewProps = ProjectViewProps,
//   S extends ProjectViewState = ProjectViewState
//   > extends React.Component<P, S> {
//   static propTypes = {}

//   static defaultProps = {}

//   updateObject(r: any): void

//   getObjectWithMutations(): any

//   renderResetButton(): JSX.Element | null

//   inEditMode(): boolean

//   getButtons(): JSX.Element[] | null

//   getTextField(arg0: any): JSX.Element | null

//   onUpload(arg0: any): void

//   renderTasks(): JSX.Element | null
