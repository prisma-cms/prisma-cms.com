import React from 'react'
import { UserViewProps } from './interfaces'
import { UserViewStyled } from './styles'
// import Link from 'next/link'
import Typography from 'material-ui/Typography'
import UserAvatar from 'src/uikit/Avatar'

const UserView: React.FC<UserViewProps> = (props) => {
  const user = props.object

  if (!user) {
    return null
  }

  return (
    <UserViewStyled>
      <Typography variant="title">{user.fullname || user.username}</Typography>

      <UserAvatar size="big" user={user} />
    </UserViewStyled>
  )
}

export default UserView
