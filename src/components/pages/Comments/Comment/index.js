import React from 'react'

import Page from '../../layout'

import PageNotFound from '../../404'
import { graphql } from '@apollo/client'

import { Comment as CommentQuery } from '../query'

import { updateCommentProcessor } from '@modxclub/ui/src/Comments/query.js'

import Comment from '@modxclub/ui/src/Comments/Comment'
import Typography from 'material-ui/Typography'

import { Link } from '@modxclub/ui'

const UpdateComment = graphql(updateCommentProcessor)(Comment)

class CommentPage extends Page {
  static propTypes = {
    ...Page.propTypes,
  }

  static defaultProps = {
    ...Page.defaultProps,
  }

  setPageMeta(meta) {
    const {
      data: { object: comment },
    } = this.props

    if (!comment) {
      return
    }

    const { CommentTarget: Topic, name, uri } = comment

    const { name: topicName, longtitle } = Topic || {}

    return super.setPageMeta({
      title: `${name ? `${name} | ` : ''}Комментарий к топику ${
        longtitle || topicName
      }`,
      canonical: uri,
      ...meta,
    })
  }

  render() {
    const { data, ...other } = this.props

    const { object: comment, loading } = data

    if (!comment) {
      if (loading) {
        return null
      } else {
        return <PageNotFound />
      }
    }

    return super.render(
      <div>
        <UpdateComment data={data} linkType="target" {...other} />

        <Typography>
          <Link to="/comments">Вернуться к списку комментариев</Link>
        </Typography>
      </div>
    )
  }
}

export default (props) => {
  return <CommentQuery View={CommentPage} {...props} />
}
