import React from 'react'
import PropTypes from 'prop-types'

import PrismaCmsComponent from '@prisma-cms/component'
import { graphql } from '@apollo/client'
import gql from 'graphql-tag'

import View from './View'
import { Typography } from 'material-ui'

export default class TopicBlog extends PrismaCmsComponent {
  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    View: PropTypes.func.isRequired,
    first: PropTypes.number,
    updateObject: PropTypes.func.isRequired,
    Topic: PropTypes.object.isRequired,
    inEditMode: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    View,
    first: 20,
  }

  componentWillMount() {
    const {
      query: { resources },
    } = this.context

    const { View } = this.props

    this.Renderer = graphql(gql(resources))(View)

    super.componentWillMount && super.componentWillMount()
  }

  render() {
    const { Renderer } = this

    const { BlogLink } = this.context

    const { updateObject, Topic, inEditMode } = this.props

    if (!Topic) {
      return null
    }

    const { Blog, blogID } = Topic

    const { id: blogId } = Blog || {}

    const value = blogID || blogId || undefined

    const filters = this.getFilters()

    let content = null

    if (inEditMode && !Blog) {
      content = (
        <Renderer
          value={value}
          getFilters={() => this.getFilters()}
          setFilters={(filters) => this.setFilters(filters)}
          updateObject={updateObject}
          where={{
            ...filters,
            type: 'Blog',
          }}
          orderBy="name_ASC"
          // onChange={(event, value) => {

          //   this.setFilters({
          //     name_contains: value && value.trim() || undefined,
          //   })
          // }}
        />
      )
    } else if (Blog) {
      content = (
        <Typography>
          В блоге <BlogLink object={Blog} />
        </Typography>
      )
    }

    return content
  }
}
