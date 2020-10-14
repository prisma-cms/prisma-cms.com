import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from '@apollo/client'

import Context from '@prisma-cms/context'

import { BlogPage } from '../'
import gql from 'graphql-tag'

// import {
//   createBlogProcessor,
// } from "../../query";

export class BlogCreatePage extends BlogPage {
  setPageMeta(meta) {
    return super.setPageMeta({
      title: 'Добавить блог',
    })
  }

  onSave = (result) => {
    if (result && result.data) {
      const { history } = this.props

      const { location } = history

      const {
        response: { data: object },
      } = result.data || {}

      const { uri } = object || {}

      if (uri && location.pathname !== uri) {
        history.replace(uri)
      }
    }
  }

  mutate = (options) => {
    const {
      query: { createBlogProcessor },
      client,
    } = this.context

    return client.mutate({
      mutation: gql(createBlogProcessor),
      ...options,
    })
  }
}

export class CreatePage extends Component {
  // static contextType = Context;

  render() {
    return (
      <BlogCreatePage
        {...this.props}
        data={{
          object: {},
        }}
        _dirty={{
          name: '',
        }}
      />
    )
  }
}

export default CreatePage

// export default graphql(createBlogProcessor)(CreatePage);
