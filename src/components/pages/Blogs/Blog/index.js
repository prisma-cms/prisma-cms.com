import React, { Component } from 'react'

import PropTypes from 'prop-types'

import Page from '../../layout'

import PageNotFound from '../../404'

import { BlogConnector } from '../query'

import View from './View'
import gql from 'graphql-tag'

export class BlogPage extends Page {
  static propTypes = {
    ...Page.propTypes,
    View: PropTypes.func.isRequired,
  }

  static defaultProps = {
    ...Page.defaultProps,
    View,
  }

  setPageMeta(meta = {}) {
    const {
      data: { object: blog },
    } = this.props

    if (!blog) {
      return
    }

    const { name: blogName, uri } = blog

    return super.setPageMeta({
      title: `Топики в блоге "${blogName}"`,
      canonical: uri,
    })
  }

  mutate = (options) => {
    const {
      query: { updateBlogProcessor },
      client,
    } = this.context

    return client.mutate({
      mutation: gql(updateBlogProcessor),
      ...options,
    })
  }

  render() {
    const { data, View, ...other } = this.props

    const { object: blog, loading } = data

    let output = null

    if (!blog) {
      if (loading) {
        output = null
      } else {
        return <PageNotFound title="Блог не найден" />
      }
    } else {
      output = (
        <View
          data={data}
          onSave={this.onSave}
          mutate={this.mutate}
          {...other}
        />
      )
    }

    return super.render(output)
  }
}

export default (props) => {
  return <BlogConnector View={BlogPage} {...props} />
}
