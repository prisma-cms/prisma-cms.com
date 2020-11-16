/**
 * Выводит форматированный номер заказа и слаба
 */

import React, { Component } from 'react'
// import PropTypes from 'prop-types';

import NumberFormatProto from 'react-number-format'
import TextField from 'material-ui/TextField'

import { PhoneFieldProps } from './interfaces'

export * from './interfaces'

export function formatPhone(str: string) {
  str = str ? str.replace(/[^0-9]/g, '').substr(0, 11) : ''

  const value = str
    ? str.split('').reduce<string[]>((current, next) => {
        current.push(next)
        return current
      }, [])
    : []

  return `+${value[0] || '#'}(${value[1] || '#'}${value[2] || '#'}${
    value[3] || '#'
  })${value[4] || '#'}${value[5] || '#'}${value[6] || '#'}-${value[7] || '#'}${
    value[8] || '#'
  }-${value[9] || '#'}${value[10] || '#'}`
}

class NumberFormat extends NumberFormatProto {}

class PhoneField extends Component<PhoneFieldProps> {
  valueToText = formatPhone

  removeFormatting = (value: string) => {
    return value ? value.replace(/^\+/, '').replace(/[^0-9]/g, '') : ''
  }

  onValueChange = (values: Record<string, any>) => {
    const {
      // name,
      onChange,
      // value,
      // ...other
    } = this.props

    const { value } = values

    onChange &&
      onChange({
        target: {
          name,
          value,
        },
      })
  }

  render() {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onChange,
      // name,
      value,
      ...other
    } = this.props

    return (
      <NumberFormat
        value={value || ''}
        customInput={TextField}
        format={this.valueToText}
        removeFormatting={this.removeFormatting}
        onValueChange={this.onValueChange}
        {...other}
      />
    )
  }
}

export default PhoneField
