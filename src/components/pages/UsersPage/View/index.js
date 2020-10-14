import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
// import Typography from 'material-ui/Typography';
// import Grid from 'material-ui/Grid';

import {
  styles,
  UsersPageView as PrismaCmsUsersPageView,
} from '@prisma-cms/front/lib/components/pages/UsersPage/View'

import Filters from '@prisma-cms/filters'

import moment from 'moment'
import { Typography } from 'material-ui'

export class UsersPageView extends PrismaCmsUsersPageView {
  static propTypes = {
    ...PrismaCmsUsersPageView.propTypes,
    filters: PropTypes.object,
    setFilters: PropTypes.func,
  }

  // static defaultProps = {
  //   ...PrismaCmsUsersPageView.defaultProps,
  // };

  renderFilters() {
    const { filters, setFilters } = this.props

    return filters && setFilters ? (
      <Filters queryName="users" filters={filters} setFilters={setFilters} />
    ) : null
  }

  getColumns() {
    const { UserLink, ProjectLink, Link } = this.context

    return [
      {
        id: 'username',
        numeric: false,
        disablePadding: false,
        label: 'Пользователь',
        renderer: (_value, record) => {
          return <UserLink user={record} />
        },
      },
      {
        id: 'createdAt',
        numeric: false,
        disablePadding: false,
        label: 'Дата регистрации',
        renderer: (value) => {
          return value ? moment(value).format('LL') : ''
        },
      },
      {
        id: 'ProjectsCreated',
        numeric: false,
        disablePadding: false,
        label: 'Создал проекты',
        renderer: (value, record) => {
          const { username } = record

          let output

          const max = 3

          if (value && value.length) {
            const projects = value.map((n) => {
              const { id } = n

              return <ProjectLink key={id} object={n} />
            })

            const listProjects = projects.splice(0, max)

            const moreProjects = projects.length

            output = (
              <Fragment>
                {listProjects.reduce((a, b) => [a, ', ', b])}{' '}
                {moreProjects ? (
                  <Link
                    to={`/projects?filters=%7B"CreatedBy"%3A%7B"username"%3A"${username}"%7D%7D`}
                  >
                    <Typography variant="caption">
                      и еще {moreProjects}
                    </Typography>
                  </Link>
                ) : null}
              </Fragment>
            )
          }

          return output
        },
      },
      {
        id: 'Projects',
        numeric: false,
        disablePadding: false,
        label: 'Участвует в проектах',
        renderer: (value, record) => {
          const { username } = record

          let output

          const max = 3

          if (value && value.length) {
            const projects = value.map((n) => {
              const { id, Project } = n

              return <ProjectLink key={id} object={Project} />
            })

            const listProjects = projects.splice(0, max)

            const moreProjects = projects.length

            output = (
              <Fragment>
                {listProjects.reduce((a, b) => [a, ', ', b])}{' '}
                {moreProjects ? (
                  <Link
                    to={`/projects?filters=%7B"Members_some"%3A%7B"User"%3A%7B"username"%3A"${username}"%7D%7D%7D`}
                  >
                    <Typography variant="caption">
                      и еще {moreProjects}
                    </Typography>
                  </Link>
                ) : null}
              </Fragment>
            )
          }

          return output
        },
      },
    ]
  }
}

export default withStyles(styles)((props) => <UsersPageView {...props} />)
