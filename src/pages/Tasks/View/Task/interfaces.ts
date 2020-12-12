import { EditableObjectProps } from 'apollo-cms/dist/DataView/Object/Editable'
import { TasksConnectionTaskFragment } from 'src/modules/gql/generated'

export interface TaskViewProps extends EditableObjectProps {
  object: TasksConnectionTaskFragment | null | undefined

  createTask?(arg0: any): Promise<void>

  updateTask?(arg0: any): Promise<void>

  createTimer?(arg0: any): Promise<void>

  updateTimer?(arg0: any): Promise<void>

  showStatus?: boolean

  showCreatedBy?: boolean

  classes?: any

  showDetails?: boolean
}
