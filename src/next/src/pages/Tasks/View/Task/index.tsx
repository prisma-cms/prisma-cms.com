import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'

import EditableView from 'apollo-cms/dist/DataView/Object/Editable'

import withStyles from 'material-ui/styles/withStyles'
import IconButton from 'material-ui/IconButton'
import StartIcon from 'material-ui-icons/PlayArrow'
import StopIcon from 'material-ui-icons/Stop'

import Typography from 'material-ui/Typography'

// import Grid from '@prisma-cms/front/lib/modules/ui/Grid'

import moment from 'moment'

// import { UserLink, TaskLink, Editor, ProjectLink } from '@modxclub/ui'

// import TimersListView from '../../../Timers/View/List'
import TimersListView from 'src/pages/Timers/View/List'

// import { createTaskProcessor, updateTaskProcessor } from '../../query'

// import {
//   createTimerProcessor,
//   updateTimerProcessor,
// } from '../../../Timers/query'
// import { graphql, compose } from '@apollo/client'
import Grid from 'src/components/ui/Grid'
import { TaskViewProps } from './interfaces'
// import { Task } from 'src/modules/gql/generated'
import TaskLink from 'src/components/ui/Link/Task'
import ProjectLink from 'src/components/ui/Link/Project'
import UserLink from 'src/components/ui/Link/User'
import { UserLinkAvatarSize } from 'src/components/ui/Link/User/interfaces'

import Editor from '@prisma-cms/editor'

// export {
//   UserLink,
//   TaskLink,
//   Editor,
//   ProjectLink,
//   updateTaskProcessor,
//   createTimerProcessor,
//   updateTimerProcessor,
// }

export const styles = () => {
  return {
    root: {},
  }
}

export class TaskView<
  P extends TaskViewProps = TaskViewProps
> extends EditableView<P> {
  // static propTypes = {
  //   ...EditableView.propTypes,
  //   classes: PropTypes.object.isRequired,
  //   showDetails: PropTypes.bool.isRequired,
  // }

  static defaultProps = {
    ...EditableView.defaultProps,
    showDetails: false,
  }

  // static contextTypes = {
  //   ...EditableView.contextTypes,
  //   openLoginForm: PropTypes.func.isRequired,
  // };

  // canEdit() {
  //   const { user: currentUser } = this.context

  //   const { id: currentUserId, sudo } = currentUser || {}

  //   const { id, CreatedBy } = this.getObjectWithMutations() || {}

  //   const { id: createdById } = CreatedBy || {}

  //   return (
  //     !id || (createdById && createdById === currentUserId) || sudo === true
  //   )
  // }

  // save() {
  //   const { user: currentUser, openLoginForm } = this.context

  //   if (!currentUser) {
  //     return openLoginForm()
  //   }

  //   return super.save()
  // }

  // async saveObject(data: Task) {
  //   const { mutate: _mutate, createTask, updateTask } = this.props

  //   let mutate = _mutate || undefined

  //   if (!mutate) {
  //     const { id } = this.getObjectWithMutations() || {}

  //     if (id && updateTask) {
  //       mutate = updateTask
  //     } else if (!id && createTask) {
  //       mutate = createTask
  //     }
  //   }

  //   if (!mutate) {
  //     throw new Error('Mutate not defined')
  //   }

  //   const mutation = this.getMutation(data)

  //   const result = await mutate(mutation)
  //     // .then((r) => r)
  //     .catch((e) => {
  //       // throw (e);
  //       return e
  //     })

  //   return result
  // }

  getCacheKey() {
    const { id } = this.getObject() ?? {}

    return `task_${id || 'new_task'}`
  }

  // getObjectWithMutations(): Task {
  //   return super.getObjectWithMutations()
  // }

  onClickUpdateTimer = (target: any) => {
    const timerId = target.attributes.role.value

    return this.mutate({
      // mutation: updateTimerProcessor,
      mutation: async () => {
        console.error('updateTimerProcessor required')
      },
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
    const taskId = target.attributes.role.value

    return this.mutate({
      // mutation: createTimerProcessor,
      mutation: async () => {
        console.error('createTimerProcessor required')
      },
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

  getButtons() {
    const buttons = super.getButtons() || []

    const { classes } = this.props

    const { id: taskId, Timers = [] } = this.getObjectWithMutations() ?? {}

    const { user: currentUser } = this.context

    const activeTimers =
      (Timers && Timers.filter((n) => n.stopedAt === null)) || []

    // buttons.push(<IconButton
    //   key="start"
    //   onClick={() => createTimer({
    //     variables: {
    //       data: {
    //         Task: {
    //           connect: {
    //             id: taskId,
    //           },
    //         },
    //       },
    //     },
    //   })}
    //   className={classes.button}
    // >
    //   <StartIcon />
    // </IconButton>);

    const { id: currentUserId } = currentUser || {}

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

    return buttons
  }

  renderHeader(): React.ReactNode {
    const { classes } = this.props

    const object = this.getObjectWithMutations() ?? null

    const { id: taskId, CreatedBy, TaskProjects } = object ?? {}

    // TODO: Ранее структура была на один проект, но сейчас возвращает несколько.
    // Надо доработать для вывода нескольких проектов
    const Project = TaskProjects?.length ? TaskProjects[0].Project : null

    const inEditMode = this.inEditMode()

    return (
      <div className={classes?.header}>
        <Grid container spacing={16}>
          <Grid item xs>
            <Grid container alignItems="center">
              <Grid item xs={inEditMode}>
                {inEditMode ? (
                  this.getTextField({
                    name: 'name',
                    fullWidth: true,
                    label: 'Название задачи',
                  })
                ) : taskId ? (
                  <Fragment>
                    {object ? <TaskLink object={object} /> : null}{' '}
                    {Project ? (
                      <span>
                        {' '}
                        (<ProjectLink object={Project} />)
                      </span>
                    ) : null}
                  </Fragment>
                ) : null}
              </Grid>

              <Grid item>{this.getButtons()}</Grid>

              <Grid item xs={!inEditMode}></Grid>

              <Grid item>
                {CreatedBy ? <UserLink user={CreatedBy} /> : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }

  renderActiveTimers() {
    const { Timers } = this.getObjectWithMutations() ?? {}

    const activeTimers =
      (Timers && Timers.filter((n) => n.stopedAt === null)) || []

    const collaborators: JSX.Element[] = []

    if (activeTimers.length) {
      activeTimers.map((n) => {
        const { id, CreatedBy } = n

        collaborators.push(
          <Grid key={id} item>
            <UserLink user={CreatedBy} size={UserLinkAvatarSize.small} />
          </Grid>
        )
      })
    }

    return collaborators && collaborators.length ? (
      <div>
        <Typography>Сейчас над задачей работают:</Typography>

        <Grid container spacing={8}>
          {collaborators}
        </Grid>
      </div>
    ) : null
  }

  onEditorChange = (content: any) => {
    return this.updateObject({
      content,
    })
  }

  renderDefaultView() {
    const { showDetails } = this.props

    const task = this.getObjectWithMutations() ?? null

    if (!task) {
      return null
    }

    const {
      id,
      content,
      Timers,
      startDatePlaning,
      endDatePlaning,
      startDate,
      endDate,
    } = task

    const inEditMode = this.inEditMode()

    let details

    if (showDetails) {
      details = (
        <Fragment>
          {Timers && Timers.length ? (
            <Grid item xs={12}>
              <Typography variant="subheading">Таймеры в задаче</Typography>

              <TimersListView timers={Timers} />
            </Grid>
          ) : null}
        </Fragment>
      )
    }

    return (
      <Grid container spacing={8}>
        {inEditMode || content ? (
          <Grid item xs={12}>
            <Typography variant="subheading">Описание задачи</Typography>

            <Editor
              editorKey={`task-${id}`}
              value={content}
              readOnly={!inEditMode}
              onChange={this.onEditorChange}
            />
          </Grid>
        ) : null}

        {inEditMode || startDatePlaning ? (
          <Grid item xs={12}>
            {this.getTextField({
              name: 'startDatePlaning',
              label: 'Планируемая дата начала',
              type: 'date',
              value:
                (startDatePlaning &&
                  moment(startDatePlaning).format('YYYY-MM-DD')) ||
                'дд.мм.гггг',
              disabled: !inEditMode,
            })}
          </Grid>
        ) : null}

        {inEditMode || endDatePlaning ? (
          <Grid item xs={12}>
            {this.getTextField({
              name: 'endDatePlaning',
              label: 'Планируемая дата завершения',
              type: 'date',
              value:
                (endDatePlaning &&
                  moment(endDatePlaning).format('YYYY-MM-DD')) ||
                'дд.мм.гггг',
              disabled: !inEditMode,
            })}
          </Grid>
        ) : null}

        {inEditMode || startDate ? (
          <Grid item xs={12}>
            {this.getTextField({
              name: 'startDate',
              label: 'Дата начала',
              type: 'date',
              value:
                (startDate && moment(startDate).format('YYYY-MM-DD')) ||
                'дд.мм.гггг',
              disabled: !inEditMode,
            })}
          </Grid>
        ) : null}

        {inEditMode || endDate ? (
          <Grid item xs={12}>
            {this.getTextField({
              name: 'endDate',
              label: 'Дата завершения',
              type: 'date',
              value:
                (endDate && moment(endDate).format('YYYY-MM-DD')) ||
                'дд.мм.гггг',
              disabled: !inEditMode,
            })}
          </Grid>
        ) : null}

        {details}
      </Grid>
    )
  }

  renderEditableView() {
    return this.renderDefaultView()
  }

  renderResetButton() {
    // const { id } = this.getObjectWithMutations() || {}

    return this.getObjectWithMutations()?.id ? super.renderResetButton() : null
  }

  render() {
    const object = this.getObjectWithMutations()

    if (!object) {
      return null
    }

    const { classes } = this.props

    return <div className={classes?.root}>{super.render()}</div>
  }
}

// const processors = compose(
//   graphql(createTaskProcessor, {
//     name: 'createTask',
//   }),
//   graphql(updateTaskProcessor, {
//     name: 'updateTask',
//   })
//   // graphql(createTimerProcessor, {
//   //   name: "createTimer",
//   // }),
//   // graphql(updateTimerProcessor, {
//   //   name: "updateTimer",
//   // }),
// )

// export { processors }

// export default processors(
//   withStyles(styles)((props) => <TaskView {...props} />)
// )

export default withStyles(styles)((props: TaskViewProps) => (
  <TaskView {...props} />
))
