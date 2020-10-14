import React from 'react'
import PropTypes from 'prop-types'

import withStyles from 'material-ui/styles/withStyles'
import Typography from 'material-ui/Typography'
// import Grid from "material-ui/Grid";
// import Button from "material-ui/Button";

import moment from 'moment'

// import Header from "./header";

import { styles, TableView } from '../../List'

import { BlogLink, UserLink, TopicLink, TagLink } from '@modxclub/ui'

// import PageNotFound from "../../../pages/404";

import Filters from '@prisma-cms/filters'

const customStyles = (theme) => {
  const {
    palette: {
      background: { default: defaultBackground },
    },
  } = theme

  return {
    ...styles(),

    tags: {
      marginTop: 5,
    },

    usersWrapper: {
      whiteSpace: 'nowrap',
      display: 'flex',
      alignItems: 'end',
    },
    member: {
      padding: 2,
    },
    topicColumn: {
      width: '70%',
    },
    alignCenter: {
      textAlign: 'center',
    },
  }
}

export class ForumView extends TableView {
  static propTypes = {
    ...TableView.propTypes,
    filters: PropTypes.object,
    setFilters: PropTypes.func,
  }

  static defaultProps = {
    ...TableView.defaultProps,
    title: '',
    columnData: [],
    // Header,
    // Toolbar: () => (null),
  }

  // constructor(props) {

  //   super(props);

  // }

  getColumns() {
    const {
      classes,
      data: {
        variables: { where },
      },
    } = this.props

    const { tag: activeTag } = where || {}

    const columns = [
      {
        id: 'topic',
        label: 'Топик',
        className: classes.topicColumn,
        renderer: (value, record) => {
          const { id: topicId, name, uri, Tags } = record

          const tagsList = []

          Tags &&
            Tags.map((tag) => {
              const { Tag } = tag

              const { id, name } = Tag

              tagsList.push(
                <TagLink
                  key={id}
                  object={Tag}
                  color="textSecondary"
                  className={[classes.tag].join(' ')}
                  textClassName={[activeTag === name ? 'active' : ''].join(' ')}
                />
              )
            })

          return (
            <div>
              <TopicLink object={record}>
                <Typography variant="subheading">{name}</Typography>
              </TopicLink>

              <div className={classes.tags}>{tagsList}</div>
            </div>
          )
        },
      },
      {
        id: 'Blog',
        label: 'Блог',
        className: classes.alignCenter,
        renderer: (value, record) => {
          if (!value) {
            return null
          }

          const { id: blogId, name } = value

          // return value && <BlogLink
          //   object={value}
          // >
          //   <Button
          //     size="small"
          //     color="secondary"
          //   // noWrap={false}
          //   >
          //     {name}
          //   </Button>
          // </BlogLink> || null;

          return (
            (value && (
              <BlogLink object={value} variant="button">
                {name}
              </BlogLink>
            )) ||
            null
          )
        },
      },
      {
        id: 'users',
        label: 'Участники',
        className: classes.alignCenter,
        renderer: (value, record) => {
          const users = []

          const { CreatedBy, Comments } = record

          const limit = 5

          Comments &&
            Comments.map((n) => {
              const { CreatedBy } = n

              if (
                users.length >= limit ||
                users.findIndex((n) => n.id === CreatedBy.id) !== -1
              ) {
                return
              }

              users.push(CreatedBy)
            })

          if (
            users.length < limit &&
            users.findIndex((n) => n.id === CreatedBy.id) === -1
          ) {
            users.push(CreatedBy)
          }

          return (
            <div className={classes.usersWrapper}>
              {users.map((n) => {
                const { id } = n

                return (
                  <UserLink
                    key={id}
                    user={n}
                    showName={false}
                    size="small"
                    className={classes.member}
                  />
                )
              })}
            </div>
          )
        },
      },
      {
        id: 'Comments',
        label: 'Комментарии',
        className: classes.alignCenter,
        renderer: (value, record) => {
          return (value && value.length) || 0
        },
      },
      {
        id: 'activity',
        label: 'Активность',
        className: classes.alignCenter,
        renderer: (value, record) => {
          let activity

          const { updatedAt, Comments } = record

          let date = moment(updatedAt)

          const latestComment = Comments.length && Comments[Comments.length - 1]

          if (latestComment) {
            const commentDate = moment(latestComment.updatedAt)

            if (commentDate > date) {
              date = commentDate
            }
          }

          return date.fromNow()
        },
      },
    ]

    return columns
  }

  async componentDidMount() {
    const { data } = this.props

    if (data && !data.loading) {
      ;(await data.refetch) && data.refetch()
    }

    super.componentDidMount && super.componentDidMount()
  }

  renderFilters() {
    const { filters, setFilters } = this.props

    return filters && setFilters ? (
      <Filters
        queryName="resources"
        filters={filters}
        setFilters={setFilters}
      />
    ) : null
  }

  render() {
    const { data, ...other } = this.props

    const { objectsConnection, loading } = data

    if (!objectsConnection || !objectsConnection.edges.length) {
      // if (loading) {
      //   return null;
      // }
      // else {
      //   return <PageNotFound
      //     title="Топики не были получены"
      //   />
      // }
    }

    return super.render()
  }
}

export { customStyles as styles, ForumView as TableView }

export default withStyles(customStyles)((props) => <ForumView {...props} />)
