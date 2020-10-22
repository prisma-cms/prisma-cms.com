/**
 * Страница не совсем проекта.
 * В данном случае проект получаем через страницу, то есть уникальное поле - uri,
 * оно только у ресурса есть.
 * По этой причине получаем ресурс, а из него уже получает проект
 */

import React from 'react'
import PropTypes from 'prop-types'

import Page from '../../../layout'

import PageNotFound from '../../../404'
import { graphql } from '@apollo/client'

import {
  // Project as ProjectQuery,
  ProjectResource as ProjectResourceQuery,
  createProjectProcessor,
  updateProjectProcessor,
} from '../query'

import ProjectView from '../View/Project'

// import Typography from 'material-ui/Typography';

const UpdateProject = graphql(updateProjectProcessor)(ProjectView)
const CreateProject = graphql(createProjectProcessor)(ProjectView)

export class ProjectPage extends Page {
  static propTypes = {
    ...Page.propTypes,
    showDetails: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    ...Page.defaultProps,
    showDetails: true,
  }

  setPageMeta(meta = {}) {
    const {
      data: { object: Resource },
    } = this.props

    const { Project: project, uri } = Resource || {}

    if (!project) {
      return
    }

    const { name } = project

    return super.setPageMeta({
      title: `Проект ${name}`,
      canonical: uri,
      ...meta,
    })
  }

  render() {
    const { data, ...other } = this.props

    const { object: resource, loading } = data

    const { Project: project } = resource || {}

    if (!project) {
      if (loading) {
        return null
      } else {
        return <PageNotFound />
      }
    }

    const { id: projectId } = project

    let Mutation

    if (projectId) {
      Mutation = UpdateProject
    } else {
      Mutation = CreateProject
    }

    return super.render(
      <div>
        <Mutation
          data={{
            loading,
            object: project,
          }}
          {...other}
        />
      </div>
    )
  }
}

export default (props) => {
  // return <ProjectQuery
  return <ProjectResourceQuery View={ProjectPage} {...props} />
}
