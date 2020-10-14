import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Page from '../../layout'

import { ProjectsConnector } from './query'

import View from './View'

class ProjectsPage extends Page {
  static propTypes = {
    ...Page.propTypes,
    first: PropTypes.number.isRequired,
    orderBy: PropTypes.string.isRequired,
  }

  static defaultProps = {
    ...Page.defaultProps,
    first: 12,
    orderBy: 'updatedAt_DESC',
    View,
  }

  setPageMeta(meta) {
    return super.setPageMeta(
      meta || {
        title: 'Проекты',
        ...meta,
      }
    )
  }

  setFilters(filters) {
    const {
      uri,
      router: { history },
    } = this.context

    let newUri = uri.clone()

    try {
      filters = filters ? JSON.stringify(filters) : undefined
    } catch (error) {
      console.error(error)
    }

    if (filters) {
      if (newUri.hasQuery) {
        newUri = newUri.setQuery({
          filters,
        })
      } else {
        newUri = newUri.addQuery({
          filters,
        })
      }
    } else {
      newUri.removeQuery('filters')
    }

    newUri.removeQuery('page')

    const url = newUri.resource()

    history.push(url)
  }

  render() {
    const { first, where: propsWhere, ...other } = this.props

    const { uri } = this.context

    let { page, filters } = uri.query(true)

    try {
      filters = (filters && JSON.parse(filters)) || null
    } catch (error) {
      console.error(console.error(error))
    }

    const AND = []

    if (propsWhere) {
      AND.push(propsWhere)
    }

    if (filters) {
      AND.push(filters)
    }

    const where = {
      AND,
    }

    let skip

    page = (page && parseInt(page)) || 0

    if (first && page > 1) {
      skip = (page - 1) * first
    }

    return super.render(
      <ProjectsConnector
        where={where}
        first={first}
        skip={skip}
        page={page ? parseInt(page) : undefined}
        filters={filters || {}}
        setFilters={(filters) => this.setFilters(filters)}
        {...other}
      />
    )
  }
}

export default ProjectsPage
