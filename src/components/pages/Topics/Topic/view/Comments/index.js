import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import Comment from "./Comment";

import Typography from 'material-ui/Typography'

import {
  createCommentProcessor,
  updateCommentProcessor,
} from '@modxclub/ui/src/Comments/query.js'

import { graphql } from '@apollo/client'

import Comment from '@modxclub/ui/src/Comments/Comment'
const NewComment = graphql(createCommentProcessor)(Comment)
const UpdateComment = graphql(updateCommentProcessor)(Comment)

class TopicComments extends Component {
  static propTypes = {
    topic: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      ...this.state,
      commentData: {
        object: {},
      },
    }
  }

  render() {
    const { topic } = this.props

    if (!topic) {
      return null
    }

    const { commentData } = this.state

    const { id: topicId, Comments } = topic

    const comments =
      (Comments &&
        Comments.map((n) => {
          const { id } = n

          return (
            <UpdateComment
              key={id}
              data={{
                object: n,
              }}
            />
          )
        })) ||
      null

    return (
      <div>
        {comments}

        {topicId && commentData ? (
          <NewComment
            // key={comments.length + "__comment"}
            cacheKey={`${topicId}_comment_new`}
            data={commentData}
            _dirty={{
              content: {
                blocks: [
                  {
                    text: '',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                ],
                entityMap: {},
              },
              topicID: topicId,
            }}
            onSave={(result) => {
              this.setState(
                {
                  commentData: null,
                },
                () => {
                  this.setState({
                    commentData: {
                      ...commentData,
                    },
                  })
                }
              )
            }}
          />
        ) : null}
      </div>
    )
  }
}

export default TopicComments
