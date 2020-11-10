import React from 'react'
import moment from 'moment'
// import { UserAvatarAlign } from '../interfaces';
import { CommentHeaderStyled, CommentStyled } from '../styles'
import { CommentProps } from './interfaces'
import UserLink from 'src/components/ui/Link/User'

/**
 * Компонент вывода комментария
 */
const Comment: React.FC<CommentProps> = (props) => {
  const { comment } = props

  const {
    // id,
    // uri,
    createdAt,
    contentText,
    CreatedBy,
  } = comment

  return (
    <CommentStyled className="comment">
      <CommentHeaderStyled>
        <div className="createdBy">
          {/* <UserAvatarStyled url={image} align={UserAvatarAlign.Left} />{' '}
        {fullname || username} */}
          <UserLink user={CreatedBy} />
        </div>

        <div>{createdAt ? moment(createdAt).format('lll') : null}</div>
      </CommentHeaderStyled>

      <div>{contentText}</div>
    </CommentStyled>
  )
}

export default Comment
