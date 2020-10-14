import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { Typography } from 'material-ui'

import Context from '@prisma-cms/context'

import TimersList from './List'

class TimersView extends Component {
  static contextType = Context

  static propTypes = {}

  render() {
    const { Grid, Pagination } = this.context

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

    const timers = edges.map((n) => n.node)

    const content = (
      <Grid container spacing={0}>
        {edges && edges.length ? (
          <Grid item xs={12}>
            <TimersList timers={timers} />

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

export default TimersView
