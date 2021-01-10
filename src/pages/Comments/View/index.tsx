import React from 'react'
import Pagination from 'src/components/Pagination'
import Comment from 'src/uikit/Comments/Comment'
import { CommentsViewProps } from './interfaces'

const CommentsView: React.FC<CommentsViewProps> = (props) => {
  const { limit, page, total, objects } = props

  return (
    <>
      {objects.map((comment) => {
        return <Comment key={comment.id} object={comment} linkType="target" />
      })}

      <Pagination limit={limit} page={page} total={total} />
    </>
  )
}

export default CommentsView
