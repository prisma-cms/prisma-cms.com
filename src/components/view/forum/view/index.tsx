// import React from 'react'
// import PropTypes from 'prop-types'

import withStyles from 'material-ui/styles/withStyles'
import Typography from 'material-ui/Typography'
// import Grid from "material-ui/Grid";
// import Button from "material-ui/Button";

import moment from 'moment'

// import Header from "./header";

// import { styles, TableView } from '../../List'
import { styles, ObjectsListView as TableView } from '../../List'

import { TopicsConnectionTopicFragment, TopicsConnectionUserFragment } from 'src/modules/gql/generated'

import TagLink from 'src/next/src/components/ui/Link/Tag'
import TopicLink from 'src/next/src/components/ui/Link/Topic'
import BlogLink from 'src/next/src/components/ui/Link/Blog'
import UserLink from 'src/next/src/components/ui/Link/User'

// import PageNotFound from "../../../pages/404";

// import Filters from '@prisma-cms/filters'

// import { ForumViewProps, TableViewProps } from './interfaces';
import {
  // ColumnConfig,
  ForumViewProps,
  // TableViewProps,
} from './interfaces'
import { UserLinkAvatarSize } from '../../../../next/src/components/ui/Link/User/interfaces'
import { ColumnConfig } from 'apollo-cms/lib/DataView/List/Table'

const customStyles = () => {
  // const {
  //   palette: {
  //     background: { default: defaultBackground },
  //   },
  // } = theme

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

// declare class TableView extends React.Component {

//   static propTypes: any;

//   static defaultProps: any;

//   public props: TableViewProps;
// }

/**
 * Табличный вывод топиков
 */
export class ForumView<P extends ForumViewProps = ForumViewProps> extends TableView<P> {
  // static propTypes = {
  //   ...TableView.propTypes,
  //   filters: PropTypes.object,
  //   setFilters: PropTypes.func,
  // }

  static defaultProps = {
    ...TableView.defaultProps,
    title: '',
    columnData: [],
    // Header,
    // Toolbar: () => (null),
  }


  getColumns() {

    const {
      classes,
      variables,
    } = this.props

    // const { tag: activeTag } = where || {}

    const activeTag = variables?.where?.Tags_some?.Tag;

    const columns: ColumnConfig<TopicsConnectionTopicFragment>[] = [
      {
        id: 'id',
        key: 'topic',
        label: 'Топик',
        className: classes?.topicColumn,
        renderer: (_value, record) => {
          const { name, Tags } = record

          const tagsList: JSX.Element[] = []

          Tags &&
            Tags.map((tag) => {
              const { Tag } = tag

              const { id, name } = Tag

              tagsList.push(
                <TagLink
                  key={id}
                  object={Tag}
                  color="textSecondary"
                  className={[classes?.tag].join(' ')}
                  textClassName={[activeTag === name ? 'active' : ''].join(' ')}
                />
              )
            })

          return (
            <div>
              <TopicLink object={record}>
                <Typography variant="subheading">{name}</Typography>
              </TopicLink>

              <div className={classes?.tags}>{tagsList}</div>
            </div>
          )
        },
      },
      {
        id: 'Blog',
        label: 'Блог',
        className: classes?.alignCenter,
        renderer: (value) => {
          if (!value) {
            return null
          }

          const { name } = value

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
        id: "CreatedBy",
        label: 'Участники',
        className: classes?.alignCenter,
        renderer: (_value, record) => {
          const users: TopicsConnectionUserFragment[] = []

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
            <div className={classes?.usersWrapper}>
              {users.map((n) => {
                const { id } = n

                return (
                  <UserLink
                    key={id}
                    user={n}
                    showName={false}
                    size={UserLinkAvatarSize.small}
                    className={classes?.member}
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
        className: classes?.alignCenter,
        renderer: (value) => {
          return (value && value.length) || 0
        },
      },
      {
        id: 'id',
        key: 'activity',
        label: 'Активность',
        className: classes?.alignCenter,

        renderer: (_value, record) => {
          // let activity

          const { updatedAt, Comments } = record

          let date = moment(updatedAt)

          const latestComment =
            Comments?.length && Comments[Comments.length - 1]

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
}

export { customStyles as styles, ForumView as TableView }


export default withStyles(customStyles)((props: ForumViewProps) => {
  return <ForumView {...props} />
});

