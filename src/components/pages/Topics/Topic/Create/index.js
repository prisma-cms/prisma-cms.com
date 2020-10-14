import React, { Component } from 'react'

import { graphql } from '@apollo/client'

import Context from '@prisma-cms/context'

import { TopicPage } from '../'

import { createTopicProcessor } from '../../query'

export class TopicCreatePage extends TopicPage {
  setPageMeta() {
    return super.setPageMeta({
      title: 'Добавить топик',
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

  // componentWillMount() {

  //   const {
  //     View,
  //   } = this.props;

  //   const Renderer = compose(
  //     graphql(createTopic, {
  //     }),

  //   )(View);

  //   Object.assign(this.state, {
  //     Renderer,
  //     data: {
  //       object: {},
  //     },
  //   });

  //   super.componentWillMount && super.componentWillMount();

  // }

  // render() {

  //   const {
  //     View,
  //     ...other
  //   } = this.props;

  //   const {
  //     Renderer,
  //     data,
  //   } = this.state;

  //   const {
  //     location: {
  //       search: {
  //         name,
  //         place,
  //         parent,
  //       },
  //     },
  //   } = this.context;

  //   return <Renderer
  //     data={data}
  //     onSave={result => this.onSave(result)}
  //     _dirty={{
  //       name,
  //       parent,
  //       place: place ? {
  //         id: place,
  //       } : undefined,
  //     }}
  //     {...other}
  //   />

  // }
}

export class CreatePage extends Component {
  static contextType = Context

  render() {
    const { user: currentUser, uri } = this.context

    const { blogID } = uri.query(true)

    return (
      <TopicCreatePage
        {...this.props}
        data={{
          object: {
            CreatedBy: currentUser,
          },
        }}
        _dirty={{
          name: '',
          topic_tags: [],
          content: [],
          blogID,
        }}
      />
    )
  }
}

export default graphql(createTopicProcessor)(CreatePage)
