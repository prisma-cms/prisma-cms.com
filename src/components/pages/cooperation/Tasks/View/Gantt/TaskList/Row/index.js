import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import EditableView from 'apollo-cms/lib/DataView/Object/Editable'
import { withStyles } from 'material-ui'
import { Grid, Editor } from '../../../../../../ui'
import { Typography } from 'material-ui'

import moment from 'moment'

import TimersListView from '../../../../../Timers/View/List'

const styles = {
  root: {
    // borderTop: "1px solid #ddd",
    borderBottom: '1px solid #ddd',
    padding: 5,
  },
}

class TaskListRow extends EditableView {
  renderHeader() {}

  canEdit() {
    const { user: currentUser } = this.context

    const { id: currentUserId, sudo } = currentUser || {}

    const { id, CreatedBy } = this.getObjectWithMutations() || {}

    const { id: createdById } = CreatedBy || {}

    return (
      !id || (createdById && createdById === currentUserId) || sudo === true
    )
  }

  renderDefaultView__() {
    const object = this.getObjectWithMutations()

    const { id, name } = object

    const inEditMode = this.isInEditMode()

    return (
      <Grid container spacing={8}>
        <Grid item xs>
          {inEditMode ? (
            this.getTextField({
              name: 'name',
            })
          ) : (
            <Typography variant="title">{name}</Typography>
          )}
        </Grid>
        <Grid item>{this.getButtons()}</Grid>
      </Grid>
    )
  }

  renderDefaultView() {
    const { classes, showDetails } = this.props

    const task = this.getObjectWithMutations()

    if (!task) {
      return null
    }

    const {
      name,
      content,
      Timers,
      startDatePlaning,
      endDatePlaning,
      startDate,
      endDate,
    } = task

    const inEditMode = this.isInEditMode()
    const allow_edit = this.canEdit()

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
        <Grid item xs={12}>
          <Grid container spacing={8}>
            <Grid item xs>
              {inEditMode ? (
                this.getTextField({
                  name: 'name',
                })
              ) : (
                <Typography variant="title">{name}</Typography>
              )}
            </Grid>
            <Grid item>{this.getButtons()}</Grid>
          </Grid>
        </Grid>

        {inEditMode || content ? (
          <Grid item xs={12}>
            <Typography variant="subheading">Описание задачи</Typography>

            <Editor
              value={content}
              readOnly={!inEditMode}
              onChange={(content) =>
                this.updateObject({
                  content,
                })
              }
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

  render() {
    const { classes } = this.props

    return <div className={classes.root}>{super.render()}</div>
  }
}

export default withStyles(styles)((props) => <TaskListRow {...props} />)
