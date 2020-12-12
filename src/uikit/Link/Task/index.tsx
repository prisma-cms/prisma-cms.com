import React, { Component } from 'react'
import Typography from 'material-ui/Typography'

import Link from '../'

import { withStyles } from 'material-ui/styles'
import { TaskLinkProps } from './interfaces'

const styles = {}

export class TaskLink extends Component<TaskLinkProps> {
  render() {
    const { object, children, ...other } = this.props

    if (!object) {
      return null
    }

    const { id, name } = object

    if (!name || !id) {
      return null
    }

    return (
      <Link href={`/tasks/${id}`} title={name} {...other}>
        {children || <Typography component="span">{name}</Typography>}
      </Link>
    )
  }
}

export default withStyles(styles)((props: TaskLinkProps) => (
  <TaskLink {...props} />
))
