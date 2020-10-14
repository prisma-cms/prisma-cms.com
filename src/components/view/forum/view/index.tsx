// import React from 'react'
import PropTypes from 'prop-types'

import withStyles from 'material-ui/styles/withStyles'
// import Typography from 'material-ui/Typography'
// import Grid from "material-ui/Grid";
// import Button from "material-ui/Button";

import moment from 'moment'

// import Header from "./header";

// import { styles, TableView } from '../../List'
import TableView, { styles } from '../../List/TableView'

// import { BlogLink, UserLink, TopicLink, TagLink } from '@modxclub/ui'

// import PageNotFound from "../../../pages/404";

// import Filters from '@prisma-cms/filters'

// import { ForumViewProps, TableViewProps } from './interfaces';
import {
  ForumViewProps,
  // TableViewProps,
} from './interfaces'

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
      // data: {
      //   variables: { where },
      // },
    } = this.props

    // TODO
    // const { tag: activeTag } = where || {}

    // TODO:
    const columns = [
      // {
      //   id: 'topic',
      //   label: 'Топик',
      //   className: classes.topicColumn,
      //   renderer: (value, record) => {
      //     const { id: topicId, name, uri, Tags } = record

      //     const tagsList = []

      //     Tags &&
      //       Tags.map((tag) => {
      //         const { Tag } = tag

      //         const { id, name } = Tag

      //         tagsList.push(
      //           <TagLink
      //             key={id}
      //             object={Tag}
      //             color="textSecondary"
      //             className={[classes.tag].join(' ')}
      //             textClassName={[activeTag === name ? 'active' : ''].join(' ')}
      //           />
      //         )
      //       })

      //     return (
      //       <div>
      //         <TopicLink object={record}>
      //           <Typography variant="subheading">{name}</Typography>
      //         </TopicLink>

      //         <div className={classes.tags}>{tagsList}</div>
      //       </div>
      //     )
      //   },
      // },
      // {
      //   id: 'Blog',
      //   label: 'Блог',
      //   className: classes.alignCenter,
      //   renderer: (value, record) => {
      //     if (!value) {
      //       return null
      //     }

      //     const { id: blogId, name } = value

      //     // return value && <BlogLink
      //     //   object={value}
      //     // >
      //     //   <Button
      //     //     size="small"
      //     //     color="secondary"
      //     //   // noWrap={false}
      //     //   >
      //     //     {name}
      //     //   </Button>
      //     // </BlogLink> || null;

      //     return (
      //       (value && (
      //         <BlogLink object={value} variant="button">
      //           {name}
      //         </BlogLink>
      //       )) ||
      //       null
      //     )
      //   },
      // },
      // {
      //   id: 'users',
      //   label: 'Участники',
      //   className: classes.alignCenter,
      //   renderer: (value, record) => {
      //     const users = []

      //     const { CreatedBy, Comments } = record

      //     const limit = 5

      //     Comments &&
      //       Comments.map((n) => {
      //         const { CreatedBy } = n

      //         if (
      //           users.length >= limit ||
      //           users.findIndex((n) => n.id === CreatedBy.id) !== -1
      //         ) {
      //           return
      //         }

      //         users.push(CreatedBy)
      //       })

      //     if (
      //       users.length < limit &&
      //       users.findIndex((n) => n.id === CreatedBy.id) === -1
      //     ) {
      //       users.push(CreatedBy)
      //     }

      //     return (
      //       <div className={classes.usersWrapper}>
      //         {users.map((n) => {
      //           const { id } = n

      //           return (
      //             <UserLink
      //               key={id}
      //               user={n}
      //               showName={false}
      //               size="small"
      //               className={classes.member}
      //             />
      //           )
      //         })}
      //       </div>
      //     )
      //   },
      // },
      // {
      //   id: 'Comments',
      //   label: 'Комментарии',
      //   className: classes.alignCenter,
      //   renderer: (value, record) => {
      //     return (value && value.length) || 0
      //   },
      // },
      {
        id: 'activity',
        label: 'Активность',
        className: classes.alignCenter,

        // TODO: поправить типы
        renderer: (_value: any, record: any) => {
          // let activity

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

  // async componentDidMount() {
  //   const { data } = this.props

  //   if (data && !data.loading) {
  //     ; (await data.refetch) && data.refetch()
  //   }

  //   super.componentDidMount && super.componentDidMount()
  // }

  // renderFilters() {
  //   const { filters, setFilters } = this.props

  //   return filters && setFilters ? (
  //     <Filters
  //       queryName="resources"
  //       filters={filters}
  //       setFilters={setFilters}
  //     />
  //   ) : null
  // }

  // render() {
  //   const { data } = this.props

  //   if (!data?.objectsConnection) {
  //     // if (loading) {
  //     //   return null;
  //     // }
  //     // else {
  //     //   return <PageNotFound
  //     //     title="Топики не были получены"
  //     //   />
  //     // }
  //   }

  //   return super.render()
  // }
}

export { customStyles as styles, ForumView as TableView }

// import { styles, TableView } from 'apollo-cms/lib/DataView/List/Table'

// declare module 'apollo-cms' {
//   const TableView: React.ComponentType<Partial<import('rc-slider/lib/Slider').SliderProps>>;
//   // export const Range: React.ComponentType<Partial<import('rc-slider/lib/Range').RangeProps>>;
//   // export const Handle: React.ComponentType<Partial<import('rc-slider/lib/Handle').HandleProps>>;
//   // export const createSliderWithTooltip: typeof import('rc-slider/lib/createSliderWithTooltip').default;
//   export default TableView;
// }

// declare module 'rc-slider' {
//   const Slider: React.ComponentType<Partial<import('rc-slider/lib/Slider').SliderProps>>;
//   export const Range: React.ComponentType<Partial<import('rc-slider/lib/Range').RangeProps>>;
//   export const Handle: React.ComponentType<Partial<import('rc-slider/lib/Handle').HandleProps>>;
//   export const createSliderWithTooltip: typeof import('rc-slider/lib/createSliderWithTooltip').default;
//   export default Slider;
// }

// export default withStyles(customStyles)((props: ForumViewProps) => {

//   return <ForumView {...props} />;

// }) as typeof ForumView;

export default withStyles(customStyles)((props: ForumViewProps) => {
  return <ForumView {...props} />
}) as React.FC<ForumViewProps>

// export default ForumView as unknown as React.FC<ForumViewProps>;
