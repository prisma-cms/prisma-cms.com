import React, { Component } from 'react'

import moment from 'moment'

import Link from '..'

import Typography from 'material-ui/Typography'

import { UikitCommentLinkProps } from './interfaces'

export * from './interfaces'

export class UikitCommentLink extends Component<UikitCommentLinkProps> {
  render() {
    const { object, children, linkType, ...other } = this.props

    if (!object) {
      return null
    }

    const { uri, createdAt } = object

    const Topic = object.Topic || object.CommentTarget

    if (!uri) {
      return null
    }

    let url
    let content = null
    let title

    switch (linkType) {
      case 'comment':
        url = uri

        if (createdAt) {
          content = moment(createdAt).format('lll')
        }

        break

      // TODO Adde separated Component
      case 'target':
        if (!Topic) {
          console.error('Topic is not defined')
        } else {
          const { uri: topicUri, name: topicName } = Topic

          url = topicUri
          content = topicName
          title = topicName
        }

        break
    }

    if (!url || !content) {
      return null
    }

    return (
      <Link href={url} title={title} {...other}>
        {children || (
          <Typography component="span" variant="caption" color="textSecondary">
            {content}
          </Typography>
        )}
      </Link>
    )
  }
}

export default UikitCommentLink
