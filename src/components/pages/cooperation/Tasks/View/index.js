import React, { Component } from 'react'

import { Typography } from 'material-ui'

import Grid from '../../../ui/Grid'
import Pagination from '../../../ui/Pagination'

import TasksList from './List'

class TasksView extends Component {
  static propTypes = {}

  render() {
    const { page } = this.props

    const {
      objectsConnection,
      loading,
      variables: { first: limit },
    } = this.props.data

    const { edges, aggregate } = objectsConnection || {}

    const { count = 0 } = aggregate || {}

    if (!edges || !edges.length) {
      if (loading) {
        return null
      } else {
        return <Typography>Данные не были получены</Typography>
      }
    }

    const tasks = edges.map((n) => n.node)

    const content = (
      <Grid container spacing={0}>
        {edges && edges.length ? (
          <Grid item xs={12}>
            <TasksList tasks={tasks} />

            <Pagination
              limit={limit}
              total={count}
              page={page || 1}
              style={{
                marginTop: 20,
              }}
            />
          </Grid>
        ) : null}
      </Grid>
    )

    return content
  }
}

export default TasksView
