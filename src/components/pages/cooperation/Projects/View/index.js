import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Typography } from 'material-ui'

import Context from '@prisma-cms/context'
import Filters from '@prisma-cms/filters'

import ProjectsList from './List'

class ProjectsView extends Component {
  static contextType = Context

  static propTypes = {
    filters: PropTypes.object,
    setFilters: PropTypes.func,
  }

  renderFilters() {
    const { filters, setFilters } = this.props

    return filters && setFilters ? (
      <Filters queryName="projects" filters={filters} setFilters={setFilters} />
    ) : null
  }

  render() {
    const { Pagination, Link, Grid } = this.context

    const { page } = this.props

    const {
      objectsConnection,
      loading,
      variables: { first: limit },
    } = this.props.data

    const { edges, aggregate } = objectsConnection || {}

    const { count = 0 } = aggregate || {}

    let output

    if (!edges || !edges.length) {
      if (loading) {
        output = null
      } else {
        output = (
          <Typography variant="title">Данные не были получены</Typography>
        )
      }
    } else {
      const projects = edges.map((n) => n.node)

      output = (
        <Grid item xs={12}>
          <ProjectsList projects={projects} />

          <Pagination
            limit={limit}
            total={count}
            page={page || 1}
            style={{
              marginTop: 20,
            }}
          />
        </Grid>
      )
    }

    const content = (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          {this.renderFilters()}
        </Grid>

        <Grid item xs={12}>
          <Link to="/projects/create">
            <Typography>Добавить проект</Typography>
          </Link>
        </Grid>

        {output}
      </Grid>
    )

    return content
  }
}

export default ProjectsView
