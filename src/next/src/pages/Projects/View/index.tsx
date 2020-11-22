import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Typography from 'material-ui/Typography'

import Context, { PrismaCmsContext } from '@prisma-cms/context'
// import Filters from '@prisma-cms/filters'

import ProjectsList from './List'

import { ProjectsViewProps } from './interfaces'
import Pagination from 'src/components/Pagination'
import Grid from 'src/uikit/Grid'
import Link from 'next/link'
// import { ProjectsConnectionProjectFragment } from 'src/modules/gql/generated'

class ProjectsView extends Component<ProjectsViewProps> {
  static propTypes = {
    filters: PropTypes.object,
    setFilters: PropTypes.func,
  }

  static contextType = Context

  context!: PrismaCmsContext

  // renderFilters() {
  //   const { filters, setFilters } = this.props

  //   return filters && setFilters ? (
  //     <Filters queryName="projects" filters={filters} setFilters={setFilters} />
  //   ) : null
  // }

  render() {
    const { page, objects: projects, variables, count = 0 } = this.props

    const limit = variables?.first ?? 0

    // const objectsConnection = data?.objectsConnection

    // const { edges, aggregate } = objectsConnection || {}

    // const { count = 0 } = aggregate || {}

    // const projects =
    //   edges
    //     ?.map((n) => n?.node)
    //     .reduce<ProjectsConnectionProjectFragment[]>((current, next) => {
    //       if (next) {
    //         current.push(next)
    //       }

    //       return current
    //     }, []) ?? []

    const output = (
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

    const content = (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          {/* {this.renderFilters()} */}
        </Grid>

        <Grid item xs={12}>
          <Link href="/projects/create">
            <a>
              <Typography>Добавить проект</Typography>
            </a>
          </Link>
        </Grid>

        {output}
      </Grid>
    )

    return content
  }
}

export default ProjectsView
