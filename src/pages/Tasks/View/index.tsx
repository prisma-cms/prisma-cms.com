import React, { Fragment } from 'react'
// import PropTypes from 'prop-types';

// import Context from "@prisma-cms/context";

// import Filters from '@prisma-cms/filters'

// TODO Upgrade package
import Timeline from '@prisma-cms/timeline'

// import Typography from 'material-ui/Typography';

// import TasksList from "./List";

import { styles, ObjectsListView } from 'src/components/view/List'

import withStyles from 'material-ui/styles/withStyles'

// import TaskStatusSelect from "./Task/Status/Select";

import moment from 'moment'
import IconButton from 'material-ui/IconButton'

import StartIcon from 'material-ui-icons/PlayArrow'
import StopIcon from 'material-ui-icons/Stop'
// import FavoritedIcon from "material-ui-icons/Favorite";
import FavoriteIcon from 'material-ui-icons/ThumbUp'
import { TaskView } from './Task'
// import gql from 'graphql-tag';
import Button from 'material-ui/Button'
import { TasksViewProps } from './interfaces'
import { TasksConnectionTaskFragment } from 'src/modules/gql/generated'
import UserLink from 'src/uikit/Link/User'
import { UikitUserLinkAvatarSize } from 'src/uikit/Link/User/interfaces'
import Grid from 'src/uikit/Grid'
import TaskStatus from '../TaskStatus'
import TaskLink from 'src/uikit/Link/Task'
// import Pagination from 'src/components/Pagination'
import { ColumnConfig } from 'apollo-cms/dist/DataView/List/Table'

export class TasksView<
  P extends TasksViewProps = TasksViewProps
> extends ObjectsListView<P> {
  // static propTypes = {
  //   // eslint-disable-next-line react/forbid-foreign-prop-types
  //   ...TableView.propTypes,
  //   filters: PropTypes.object,
  //   setFilters: PropTypes.func,
  //   createTaskProcessor: PropTypes.func.isRequired,
  //   updateTaskProcessor: PropTypes.func.isRequired,
  //   createTimerProcessor: PropTypes.func.isRequired,
  //   updateTimerProcessor: PropTypes.func.isRequired,
  //   // createTaskReactionProcessor: PropTypes.func.isRequired,
  //   deleteTaskReaction: PropTypes.func.isRequired,
  // };

  // static defaultProps = {
  //   ...TableView.defaultProps,
  //   title: '',
  // }

  // constructor(props) {

  //   super(props);

  //   this.state = {
  //     ...this.state,
  //   }

  // }

  onClickUpdateTimer = (target: any) => {
    const { updateTimerProcessor } = this.props

    const timerId = target.attributes.role.value

    updateTimerProcessor({
      variables: {
        data: {
          stopedAt: new Date(),
        },
        where: {
          id: timerId,
        },
      },
    })
  }

  onClickCreateTimer = (target: any) => {
    const { createTimerProcessor } = this.props

    const taskId = target.attributes.role.value

    createTimerProcessor({
      variables: {
        data: {
          Task: {
            connect: {
              id: taskId,
            },
          },
        },
      },
    })
  }

  getButtons(object: TasksConnectionTaskFragment) {
    const buttons: JSX.Element[] = []

    const { classes } = this.props

    // const {
    //   UserLink,
    //   //   TaskLink,
    //   //   Editor,
    //   //   ProjectLink,
    // } = this.context;

    if (object) {
      const {
        id: taskId,
        // name,
        Timers,
        // CreatedBy,
      } = object

      // const {
      //   id: createdById,
      // } = CreatedBy || {};

      const { user: currentUser } = this.context

      const activeTimers = Timers
        ? Timers.filter((n) => n.stopedAt === null)
        : []

      if (activeTimers.length) {
        activeTimers.map((n) => {
          const { id, CreatedBy } = n

          buttons.push(
            <UserLink
              key={id}
              user={CreatedBy}
              size={UikitUserLinkAvatarSize.small}
              showName={false}
            />
          )

          return null
        })
      }

      if (currentUser) {
        const { id: currentUserId } = currentUser

        const activeTimer = activeTimers.find(
          (n) => n.CreatedBy?.id === currentUserId
        )

        if (activeTimer) {
          const { id: timerId } = activeTimer

          buttons.push(
            <IconButton
              key="stop"
              role={timerId}
              onClick={this.onClickUpdateTimer}
              className={classes?.button}
            >
              <StopIcon />
            </IconButton>
          )
        } else {
          buttons.push(
            <IconButton
              key="start"
              role={taskId}
              onClick={this.onClickCreateTimer}
              className={classes?.button}
            >
              <StartIcon />
            </IconButton>
          )
        }
      }
    }

    return buttons
  }

  renderDate(date: string | null) {
    return date ? moment(date).format('lll') : null
  }

  onClickDelete = (target: any) => {
    const { deleteTaskReaction } = this.props

    const likedId = target.attributes.role.value

    deleteTaskReaction({
      variables: {
        where: {
          id: likedId,
        },
      },
    })
  }

  // TODO Fix method
  onClickUpVote = (_target: any) => {
    // const taskId = target.attributes.role.value
    // createTaskReactionProcessor({
    // });
    // this.mutate({
    //   // mutation: gql(createTaskReactionProcessor),
    //   variables: {
    //     data: {
    //       type: 'UpVote',
    //       Task: {
    //         connect: {
    //           id: taskId,
    //         },
    //       },
    //     },
    //   },
    // })
  }

  getColumns<CC extends TasksConnectionTaskFragment>(): ColumnConfig<CC>[] {
    const {
      // Grid,
      // ProjectLink,
      // UserLink,
      // TaskLink,
      // TaskStatus,
      user: currentUser,
      // query: {
      //   createTaskReactionProcessor,
      // },
    } = this.context

    const { id: currentUserId } = currentUser || {}

    const {
      classes,
      updateTaskProcessor,
      createTimerProcessor,
      updateTimerProcessor,
      // deleteTaskReaction,
      // createTaskReactionProcessor
    } = this.props

    return [
      // {
      //   id: "Project",
      //   label: "Проект",
      //   renderer: (value, record) => {
      //     return value ? <ProjectLink
      //       object={value}
      //     /> : null;
      //   },
      // },
      // {
      //   id: "id",
      //   label: "Задача",
      //   renderer: (value, record) => {

      //     return record ? <TaskLink
      //       object={record}
      //     /> : null;
      //   },
      // },
      {
        id: 'status',
        label: 'Статус',
        hidden: false,
        renderer: (value) => {
          return value ? (
            <Grid container spacing={8} alignItems="center">
              <Grid item>
                <TaskStatus value={value} />
                {/* <TaskStatusSelect
                value={value}
                inEditMode={true}
                onChange={event => {
                  // const {
                  //   value,
                  //   name,
                  // } = event.target;
                  // this.updateObject({
                  //   [name]: value,
                  // });
                }}
              /> */}
              </Grid>
              {/* <Grid
              item
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {this.getButtons(record)}
            </Grid> */}
            </Grid>
          ) : null
        },
      },
      {
        id: 'name',
        label: 'Задача',
        hidden: true,
        renderer: (_value, record) => {
          return record ? <TaskLink object={record} /> : null
        },
      },
      // {
      //   id: "Project",
      //   label: "Проект",
      //   hidden: true,
      //   renderer: (value, record) => {

      //     return value ? <ProjectLink
      //       object={value}
      //     /> : null;
      //   },
      // },
      {
        id: 'id',
        label: 'Подробности задачи',
        hidden: false,
        renderer: (_value, record) => {
          return record ? (
            <TaskView
              object={record}
              classes={classes}
              mutate={updateTaskProcessor}
              createTimer={createTimerProcessor}
              updateTimer={updateTimerProcessor}
              showStatus={false}
              showCreatedBy={false}
            />
          ) : null
        },
      },
      {
        id: 'createdAt',
        label: 'Дата постановки',
        hidden: false,
        renderer: (value) => {
          return this.renderDate(value)
        },
      },
      {
        id: 'startDatePlaning',
        label: 'Планируемая дата начала',
        hidden: true,
        renderer: (value) => {
          return this.renderDate(value)
        },
      },
      {
        id: 'endDatePlaning',
        label: 'Планируемая дата завершения',
        hidden: true,
        renderer: (value) => {
          return this.renderDate(value)
        },
      },
      {
        id: 'startDate',
        label: 'Дата начала',
        hidden: true,
        renderer: (value) => {
          return this.renderDate(value)
        },
      },
      {
        id: 'endDate',
        label: 'Дата завершения',
        hidden: true,
        renderer: (value) => {
          return this.renderDate(value)
        },
      },
      {
        id: 'startDatePlaning',
        key: 'planes',
        label: 'Плановые сроки',
        hidden: false,
        renderer: (_value, record) => {
          // const date = value ? moment(value).format("lll") : null;

          const dates = []

          const {
            createdAt,
            startDatePlaning,
            startDate,
            endDatePlaning,
            endDate,
          } = record

          const min = moment(startDate || startDatePlaning || createdAt)
          const max =
            endDate || endDatePlaning ? moment(endDate || endDatePlaning) : null

          if (min && max) {
            const startTime = min.toDate().getTime()
            const endTime = max.toDate().getTime()

            dates.push({
              startDate: startTime,
              endDate: endTime,
            })
          }

          return dates.length ? this.renderTimeline(dates, {}) : null
        },
      },
      {
        id: 'CreatedBy',
        label: 'Постановщик',
        hidden: false,
        renderer: (value) => {
          return value ? (
            <UserLink user={value} size={UikitUserLinkAvatarSize.small} />
          ) : null
        },
      },
      // {
      //   id: "RelatedTo",
      //   label: "Связано с",
      //   renderer: (value, record) => {

      //     // return value ? <TaskStatus
      //     //   value={value}
      //     // /> : null;

      //     return value && value.length ? value.map(n => <TaskLink
      //       key={n.id}
      //       object={n}
      //     />).reduce((a, b) => [a, ", ", b]) : null;
      //   },
      // },
      {
        id: 'Reactions',
        label: 'Нравится',
        hidden: false,
        renderer: (value: CC['Reactions'], record) => {
          if (!value) {
            return null
          }

          const { id: taskId } = record

          const users =
            value && value.length
              ? value.filter(
                  (n) => n.CreatedBy && n.CreatedBy.id !== currentUserId
                )
              : []

          let like

          const liked =
            (currentUserId &&
              value &&
              value.find(
                (n) => n.CreatedBy && n.CreatedBy.id === currentUserId
              )) ||
            null

          if (liked) {
            const { id: likedId } = liked

            like = (
              <IconButton role={likedId} onClick={this.onClickDelete}>
                <FavoriteIcon color="primary" />
              </IconButton>
            )
          } else {
            like = (
              <IconButton role={taskId} onClick={this.onClickUpVote}>
                <FavoriteIcon color="action" />
              </IconButton>
            )
          }

          return (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Grid container spacing={8}>
                {users.length
                  ? users.map((n) => (
                      <Grid key={n.id} item>
                        <UserLink
                          user={n.CreatedBy}
                          size={UikitUserLinkAvatarSize.small}
                          showName={false}
                        />
                      </Grid>
                    ))
                  : null}
              </Grid>

              {like}
            </div>
          )
        },
      },
      // {
      //   id: "status",
      //   label: "Статус",
      // },
    ]
  }

  // TODO restore filters
  renderFilters() {
    return null

    // const { filters, setFilters } = this.props

    // return (
    //   <Fragment>
    //     {filters && setFilters ? (
    //       <Filters
    //         queryName="tasks"
    //         filters={filters}
    //         setFilters={setFilters}
    //       />
    //     ) : null}

    //     {this.renderTimeline()}
    //   </Fragment>
    // )
  }

  renderTimeline(defaultDates?: any, options?: any) {
    const {
      // Grid,
      theme,
    } = this.context

    const {
      typography: { caption },
    } = theme

    const {
      // data,
      objects: tasks,
      // classes,
    } = this.props

    // const tasks = objectsConnection ? objectsConnection.edges.map(n => n?.node).filter(n => !!n) : [];

    // const tasks: TasksConnectionTaskFragment[] =
    //   data?.objectsConnection.edges.reduce<TasksConnectionTaskFragment[]>(
    //     (curr, next) => {
    //       if (next?.node) {
    //         curr.push(next.node)
    //       }

    //       return curr
    //     },
    //     []
    //   ) ?? []

    let minDate = 0
    let maxDate = 0

    const dates: any[] = []

    tasks.map((n) => {
      const {
        createdAt,
        startDatePlaning,
        startDate,
        endDatePlaning,
        endDate,
      } = n

      const min = moment(startDate || startDatePlaning || createdAt)
      const max =
        endDate || endDatePlaning ? moment(endDate || endDatePlaning) : null

      if (min && max) {
        const startTime = min.toDate().getTime()
        const endTime = max.toDate().getTime()

        dates.push({
          startDate: startTime,
          endDate: endTime,
        })

        if (!minDate || minDate > startTime) {
          minDate = startTime
        }

        if (!maxDate || maxDate < endTime) {
          maxDate = endTime
        }
      }

      return null
    })

    const showDates = defaultDates ? defaultDates : dates

    let timeline

    if (minDate && maxDate && showDates && showDates.length) {
      timeline = (
        <Grid container>
          <Grid item>
            <span
              style={{
                ...caption,
                padding: 5,
              }}
            >
              {moment(minDate).format('DD.MM.YYYY')}
            </span>
          </Grid>

          <Grid item xs>
            <Timeline
              minDate={minDate}
              maxDate={maxDate}
              dates={showDates}
              // onStartDateChange={() => {
              //   console.error('onStartDateChange??')
              // }}
              // onEndDateChange={() => {
              //   console.error('onEndDateChange??')
              // }}
              {...options}
            />
          </Grid>

          <Grid item>
            <Grid item>
              <span
                style={{
                  ...caption,
                  padding: 5,
                }}
              >
                {moment(maxDate).format('DD.MM.YYYY')}
              </span>
            </Grid>
          </Grid>
        </Grid>
      )
    }

    return timeline
  }

  render() {
    // const {
    //   Pagination,
    //   Grid,
    // } = this.context;

    const { setShowAll, showAll, count = 0, variables } = this.props

    // const {
    //   objectsConnection,
    //   // loading,
    //   variables: {
    //     first: limit,
    //   },
    // } = this.props.data;

    // const objectsConnection = this.props.data?.objectsConnection
    // const limit = this.props.variables?.first

    // const {
    //   // edges,
    //   aggregate,
    // } = objectsConnection || {}

    // const { count = 0 } = aggregate || {}

    const limit = variables?.first ?? 0

    let showAllButton

    if (showAll) {
      showAllButton = <Button onClick={this.onClickHideAll}>Скрыть</Button>
    } else if (limit && count && count > limit && setShowAll) {
      showAllButton = (
        <Button onClick={this.onClickShowAll}>Показать все ({count})</Button>
      )
    }

    const content = (
      <Fragment>
        {super.render()}

        <div
          style={{
            textAlign: 'center',
          }}
        >
          {/* <Grid
            container
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              width: 'auto',
            }}
          >
            <Grid item>
              <Pagination
                limit={limit || 0}
                total={count}
                page={page}
                style={{
                  marginTop: 20,
                }}
              />
            </Grid>

            <Grid item>{showAllButton}</Grid>
          </Grid> */}
          <Grid item>{showAllButton}</Grid>
        </div>
      </Fragment>
    )

    return content
  }

  onClickHideAll = () => {
    const { setShowAll } = this.props

    return setShowAll(false)
  }

  onClickShowAll = () => {
    const { setShowAll } = this.props

    return setShowAll(true)
  }
}

export default withStyles(styles)((props: TasksViewProps) => (
  <TasksView {...props} />
))
