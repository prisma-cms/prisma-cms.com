import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql } from '@apollo/client'
import gql from 'graphql-tag'

import View from './View/List'

import ListPage from '../List'

class BlogsPage extends ListPage {
  static propTypes = {
    ...ListPage.propTypes,
    View: PropTypes.func.isRequired,
  }

  static defaultProps = {
    ...ListPage.defaultProps,
    View,
    first: 10,
    orderBy: 'name_ASC',
  }

  componentWillMount() {
    const {
      query: { resourcesConnection },
    } = this.context

    const { View } = this.props

    this.Renderer = graphql(gql(resourcesConnection))(View)

    super.componentWillMount && super.componentWillMount()
  }

  setPageMeta(meta) {
    return super.setPageMeta({
      title: 'Блоги',
      ...meta,
    })
  }

  render() {
    const { Renderer } = this

    const { View, where, ...other } = this.props

    const filters = this.getFilters()

    return (
      <Renderer
        where={{
          AND: [
            {
              type_in: ['Blog', 'PersonalBlog'],
            },
            {
              ...where,
            },
          ],
          ...filters,
        }}
        {...this.getPaginationParams()}
        {...other}
        addObject={() => {
          const {
            router: { history },
          } = this.context
          history.push(`/blogs/create`)
        }}
      />
    )
  }
}

export default BlogsPage
