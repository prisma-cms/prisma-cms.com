import { CheckboxProps } from 'material-ui/Checkbox'

export interface CheckBoxProps extends CheckboxProps {
  classes?: Record<string, any>

  label?: string
}
