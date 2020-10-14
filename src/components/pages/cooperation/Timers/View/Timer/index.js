import React from 'react'
import PropTypes from 'prop-types'

import EditableView from 'apollo-cms/lib/DataView/Object/Editable'

import withStyles from 'material-ui/styles/withStyles'
import { IconButton } from 'material-ui'
import StopIcon from 'material-ui-icons/Stop'

import Grid from '@prisma-cms/front/lib/modules/ui/Grid'

import moment from 'moment'

import { UserLink, ProjectLink, TaskLink } from '@modxclub/ui'

const styles = () => {
  return {
    root: {},
  }
}

class TimerView extends EditableView {
  static propTypes = {
    ...EditableView.propTypes,
    classes: PropTypes.object.isRequired,
  }

  static defaultProps = {
    ...EditableView.defaultProps,
  }

  // static contextTypes = {
  //   ...EditableView.contextTypes,
  //   openLoginForm: PropTypes.func.isRequired,
  // };

  canEdit() {
    const { user: currentUser } = this.context

    const { id: currentUserId, sudo } = currentUser || {}

    const { id, CreatedBy } = this.getObjectWithMutations() || {}

    const { id: createdById } = CreatedBy || {}

    return (
      !id || (createdById && createdById === currentUserId) || sudo === true
    )
  }

  getButtons() {
    const canEdit = this.canEdit()

    // if (!canEdit) {
    //   return null;
    // }

    const { id: timerId, stopedAt } = this.getObjectWithMutations() || {}

    if (!timerId || stopedAt) {
      return null
    }

    const buttons = []

    buttons.push(
      <IconButton
        key="stop"
        onClick={() => this.stopTimer(timerId)}
        disabled={!canEdit}
      >
        <StopIcon />
      </IconButton>
    )

    return buttons
  }

  async stopTimer(timerId) {
    const { mutate } = this.props

    return await mutate({
      variables: {
        where: {
          id: timerId,
        },
        data: {
          stopedAt: new Date(),
        },
      },
    })
  }

  save() {
    const { user: currentUser, openLoginForm } = this.context

    if (!currentUser) {
      return openLoginForm()
    }

    return super.save()
  }

  getCacheKey() {
    const { id } = this.getObject() || {}

    return `timer_${id || 'new'}`
  }

  renderHeader() {
    const { classes } = this.props

    const object = this.getObjectWithMutations()

    const { CreatedBy, createdAt, stopedAt, Task } = object || {}

    const { Project } = Task || {}

    return (
      <div className={classes.header}>
        <Grid container spacing={16}>
          <Grid item xs>
            <Grid container alignItems="center">
              <Grid item>
                {/* {inEditMode
                ?
                this.getTextField({
                  name: "name",
                  fullWidth: true,
                })
                :

                timerId ? <TimerLink
                  object={object}
                />
                  :
                  null
              } */}

                {Task ? <TaskLink object={Task} /> : null}

                {Project ? (
                  <span>
                    {' '}
                    (<ProjectLink object={Project} />)
                  </span>
                ) : null}
              </Grid>

              <Grid item>{this.getButtons()}</Grid>

              <Grid item xs></Grid>

              <Grid item>
                {CreatedBy ? <UserLink user={CreatedBy} /> : null}
              </Grid>

              {createdAt ? (
                <Grid item xs={12}>
                  Начало: {moment(createdAt).format('lll')}
                </Grid>
              ) : null}

              {stopedAt ? (
                <Grid item xs={12}>
                  Конец: {moment(stopedAt).format('lll')}
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }

  renderDefaultView() {
    const timer = this.getObjectWithMutations()

    if (!timer) {
      return null
    }

    return (
      <Grid container>
        <Grid item></Grid>
      </Grid>
    )
  }

  renderEditableView() {
    return this.renderDefaultView()
  }

  renderResetButton() {
    const { id } = this.getObjectWithMutations() || {}

    return id ? super.renderResetButton() : null
  }

  render() {
    const object = this.getObjectWithMutations()

    if (!object) {
      return null
    }

    const { classes } = this.props

    return <div className={classes.root}>{super.render()}</div>
  }
}

export default withStyles(styles)((props) => <TimerView {...props} />)
