import { EditableObjectProps } from 'apollo-cms/lib/DataView/Object/Editable'

export interface TaskViewProps extends EditableObjectProps {
  createTask?(arg0: any): Promise<void>

  updateTask?(arg0: any): Promise<void>

  classes?: any

  showDetails?: boolean
}
