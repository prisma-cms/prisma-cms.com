import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql } from '@apollo/client'

import {
  // createProjectProcessor,
  updateProjectProcessor,
} from '../../query'

import Project from './Project'

import { Grid } from '@modxclub/ui'

// const NewProject = graphql(createProjectProcessor)(Project);
const UpdateProject = graphql(updateProjectProcessor)(Project)

class ProjectsList extends Component {
  static propTypes = {
    projects: PropTypes.array.isRequired,
  }

  static defaultProps = {}

  render() {
    const { projects } = this.props

    return (
      <Grid container spacing={16}>
        {projects.map((n) => {
          const { id } = n

          return (
            <Grid key={id} item xs={12} sm={6} md={4} lg={3}>
              <UpdateProject
                data={{
                  object: n,
                }}
                tasksLimit={3}
              />
            </Grid>
          )
        })}
      </Grid>
    )
  }
}

export default ProjectsList
