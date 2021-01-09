import React from 'react'
import Checkbox from 'material-ui/Checkbox'
import { CheckBoxProps } from './interfaces'
import FormControlLabel from 'material-ui/Form/FormControlLabel'

export class CheckBox extends React.PureComponent<CheckBoxProps> {
  render() {
    const { label, checked, ...other } = this.props

    return (
      <FormControlLabel
        control={<Checkbox checked={checked} {...other} />}
        label={label}
      />
    )
  }
}

export default CheckBox
