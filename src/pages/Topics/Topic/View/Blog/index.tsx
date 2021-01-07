/* eslint-disable react/jsx-no-bind */
import React from 'react'
// import PropTypes from 'prop-types'

// import PrismaCmsComponent from '@prisma-cms/component'
// import { graphql } from '@apollo/client'
// import gql from 'graphql-tag'

import BlogAutocomplete from './BlogAutocomplete'
import Typography from 'material-ui/Typography'
import BlogLink from 'src/uikit/Link/Blog'
import { TopicBlogProps } from './interfaces'
import { ResourceOrderByInput, ResourceType } from 'src/modules/gql/generated'

// TODO Восстановить выбор блога

const TopicBlog: React.FC<TopicBlogProps> = (props) => {
  // static propTypes = {
  //   ...PrismaCmsComponent.propTypes,
  //   View: PropTypes.func.isRequired,
  //   first: PropTypes.number,
  //   updateObject: PropTypes.func.isRequired,
  //   Topic: PropTypes.object.isRequired,
  //   inEditMode: PropTypes.bool.isRequired,
  // }

  // static defaultProps = {s
  //   ...PrismaCmsComponent.defaultProps,
  //   View,
  //   first: 20,
  // }

  // componentWillMount() {
  //   const {
  //     query: { resources },
  //   } = this.context

  //   const { View } = this.props

  //   this.Renderer = graphql(gql(resources))(View)

  //   super.componentWillMount && super.componentWillMount()
  // }

  // render() {
  // const { Renderer } = this

  // const { BlogLink } = this.context

  const { updateObject, inEditMode, Topic } = props

  if (!Topic) {
    return null
  }

  const { blogID, Blog } = Topic

  const { id: blogId } = Blog || {}

  const value = blogID || blogId || ''

  // const filters = this.getFilters()
  // const filters: ResourceWhereInput = {}

  let content = null

  if (inEditMode && !Blog) {
    content = (
      <BlogAutocomplete
        value={value}
        // getFilters={() => this.getFilters()}
        // setFilters={(filters) => this.setFilters(filters)}
        // onChange={(event, value) => {

        //   this.setFilters({
        //     name_contains: value && value.trim() || undefined,
        //   })
        // }}
        updateObject={updateObject}
        where={{
          // ...filters,
          type: ResourceType.BLOG,
        }}
        orderBy={ResourceOrderByInput.NAME_ASC}
      />
    )
  } else if (Blog) {
    content = (
      <Typography>
        <i>В блоге</i> <BlogLink object={Blog} />
      </Typography>
    )
  }

  return content
  // }
}

export default TopicBlog
