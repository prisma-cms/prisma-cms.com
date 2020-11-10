import React from 'react'

import Grid from 'src/components/ui/Grid'
import Pagination from 'src/components/Pagination'
import UserLink from 'src/components/ui/Link/User'
import Typography from 'material-ui/Typography'

import { UsersListProps } from './interfaces'

/**
 * Вывод списка пользователей, если больше одного,
 * или самого пользователя, если один
 */
const UsersList: React.FC<UsersListProps> = (props) => {
  const { users, setFilters, lexicon, page, first, count } = props

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Typography variant="caption">
          {lexicon('Choose user from list')}
        </Typography>
      </Grid>
      {users.map((n: any) => {
        const { id: userId } = n

        return (
          <Grid key={userId} item xs={12}>
            <UserLink
              user={n}
              // eslint-disable-next-line react/jsx-no-bind
              onClick={(event: React.MouseEvent) => {
                event.preventDefault()
                event.stopPropagation()

                setFilters({
                  search: userId,
                })
              }}
            />
          </Grid>
        )
      })}
      <Grid item xs={12}>
        <Pagination
          // authPage={authPage}
          page={page}
          pagevariable="authPage"
          limit={first}
          total={count}
        />
      </Grid>
    </Grid>
  )
}

export default UsersList
