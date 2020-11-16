/* eslint-disable no-console */
import React, { Component } from 'react'
import UikitComment from 'src/uikit/Comments/Comment'
import { TopicCommentsProps, TopicCommentsState } from './interfaces'
// import PropTypes from 'prop-types'

// import {
//   createCommentProcessor,
//   updateCommentProcessor,
// } from '@modxclub/ui/src/Comments/query.js'

// import { graphql } from '@apollo/client'

// import Comment from '@modxclub/ui/src/Comments/Comment'
// const NewComment = graphql(createCommentProcessor)(Comment)
// const UpdateComment = graphql(updateCommentProcessor)(Comment)

const NewComment = UikitComment
const UpdateComment = UikitComment

class TopicComments extends Component<TopicCommentsProps, TopicCommentsState> {
  // static propTypes = {
  //   topic: PropTypes.object.isRequired,
  // }

  constructor(props: TopicCommentsProps) {
    super(props)

    this.state = {
      ...this.state,
      commentData: {
        object: {},
      },
    }
  }

  onCommentSave = () => {
    console.log('onCommentSave')

    // const { commentData } = this.state

    // this.setState(
    //   {
    //     commentData: null,
    //   },
    //   () => {
    //     this.setState({
    //       commentData: {
    //         ...commentData,
    //       },
    //     })
    //   }
    // )
  }

  render() {
    const { topic } = this.props

    if (!topic) {
      return null
    }

    // const { commentData } = this.state

    const { id: topicId, Comments } = topic

    const comments =
      (Comments &&
        Comments.map((n) => {
          const { id } = n

          return <UpdateComment key={id} object={n} />
        })) ||
      null

    return (
      <div>
        {comments}

        {/* {topicId && commentData ? ( */}
        {topicId ? (
          <NewComment
            // key={comments.length + "__comment"}
            cacheKey={`${topicId}_comment_new`}
            object={undefined}
            _dirty={{
              // content: {
              //   blocks: [
              //     {
              //       text: '',
              //       type: 'unstyled',
              //       depth: 0,
              //       inlineStyleRanges: [],
              //       entityRanges: [],
              //       data: {},
              //     },
              //   ],
              //   entityMap: {},
              // },
              topicID: topicId,
            }}
            onSave={this.onCommentSave}
          />
        ) : null}
      </div>
    )
  }
}

export default TopicComments
