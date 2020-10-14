import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from './Task'
import { Typography } from 'material-ui'
import { Link } from '@modxclub/ui'

class TasksList extends Component {
  static propTypes = {
    tasks: PropTypes.array.isRequired,
    tasksLimit: PropTypes.number,
  }

  render() {
    const { tasks, tasksLimit } = this.props

    let output = null

    if (!tasks) {
      return null
    }

    if (tasks.length) {
      output = tasks.map((n, index) => {
        if (tasksLimit > 0 && tasksLimit < index + 1) {
          return
        }

        const { id } = n

        return (
          <Task
            key={id}
            data={{
              object: n,
            }}
          />
        )
      })
    } else {
      output = <Typography color="textSecondary">Нет задач</Typography>
    }

    return output
  }
}

export default TasksList
