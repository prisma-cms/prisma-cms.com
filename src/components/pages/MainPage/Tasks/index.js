import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { TasksConnector } from '../../cooperation/Tasks/query'
import { Typography } from 'material-ui'

import TasksView from '../../cooperation/Projects/View/Project/Tasks'

class ActiveTasks extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  async componentDidMount() {
    const { data } = this.props

    if (data && !data.loading) {
      ;(await data.refetch) && data.refetch()
    }

    super.componentDidMount && super.componentDidMount()
  }

  render() {
    const {
      data: { objectsConnection, loading },
    } = this.props

    if (!objectsConnection) {
      if (loading) {
        return null
      }
    }

    const tasks =
      (objectsConnection && objectsConnection.edges.map(({ node }) => node)) ||
      []

    return <TasksView tasks={tasks} />
  }
}

export default (props) => {
  return (
    <TasksConnector
      View={ActiveTasks}
      first={10}
      orderBy="updatedAt_DESC"
      where={{
        Timers_some: {
          stopedAt: null,
        },
      }}
      {...props}
    />
  )
}
