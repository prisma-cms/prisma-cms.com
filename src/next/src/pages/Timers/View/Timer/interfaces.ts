import { EditableObjectProps } from 'apollo-cms/dist/DataView/Object/Editable'
import { Timer } from 'src/modules/gql/generated'

export interface TimerViewProps extends EditableObjectProps {
  classes?: any

  // data: {
  //   object?: Timer
  // }

  object: Timer | null | undefined
}
