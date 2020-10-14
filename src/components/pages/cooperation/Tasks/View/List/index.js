import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql } from '@apollo/client'

import {
  // createTaskProcessor,
  updateTaskProcessor,
} from '../../query'

import Task from '../Task'

// const NewTask = graphql(createTaskProcessor)(Task);
const UpdateTask = graphql(updateTaskProcessor)(Task)

class TasksList extends Component {
  static propTypes = {
    tasks: PropTypes.array.isRequired,
    showDetails: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    showDetails: false,
  }

  render() {
    const { tasks, showDetails, ...other } = this.props

    if (!tasks) {
      return null
    }

    return tasks.map((n) => {
      const { id } = n

      return (
        <UpdateTask
          key={id}
          data={{
            object: n,
          }}
          showDetails={showDetails}
          {...other}
        />
      )
    })
  }
}

export default TasksList
