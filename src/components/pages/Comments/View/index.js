import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CommentsList from '@modxclub/ui/src/Comments/List'

import Typography from 'material-ui/Typography'

import Context from '@prisma-cms/context'

class CommentsView extends Component {
  static contextType = Context

  static propTypes = {
    pagination: PropTypes.number,
  }

  async componentDidMount() {
    const { data } = this.props

    if (data && !data.loading) {
      ;(await data.refetch) && data.refetch()
    }

    super.componentDidMount && super.componentDidMount()
  }

  render() {
    const { Pagination, Grid } = this.context

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

    const comments = edges.map((n) => n.node)

    const content = (
      <Grid container spacing={0}>
        {edges && edges.length ? (
          <Grid item xs={12}>
            <CommentsList comments={comments} linkType="target" />

            {page !== undefined ? (
              <Pagination
                limit={limit}
                total={count}
                page={page || 1}
                style={{
                  marginTop: 20,
                }}
              />
            ) : null}
          </Grid>
        ) : null}
      </Grid>
    )

    return content
  }
}

export default CommentsView
