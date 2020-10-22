import React from 'react'
import PropTypes from 'prop-types'

import { DataTask } from '@prisma-cms/react-timeline-gantt'

import withStyles from 'material-ui/styles/withStyles'
import IconButton from 'material-ui/IconButton'
import StartIcon from 'material-ui-icons/PlayArrow'
import StopIcon from 'material-ui-icons/Stop'

import { Grid, UserLink } from '@modxclub/ui'

import { updateTaskProcessor } from '../../../query'

import {
  createTimerProcessor,
  updateTimerProcessor,
} from '../../../../Timers/query'

import { compose, graphql } from '@apollo/client'

const styles = {
  root: {
    flexWrap: 'nowrap',
  },
  name: {
    overflow: 'hidden',
  },
  button: {
    height: 24,
    width: 24,
  },
}

class DataTaskCustom extends DataTask {
  static contextTypes = {
    user: PropTypes.object,
  }

  renderInner() {
    const { item, createTimer, updateTimer, classes } = this.props

    const { id: taskId, name, Timers } = item

    const { user: currentUser } = this.context

    const activeTimers =
      (Timers && Timers.filter((n) => n.stopedAt === null)) || []

    const buttons = []

    if (activeTimers.length) {
      activeTimers.map((n) => {
        const { id, CreatedBy } = n

        buttons.push(
          <UserLink key={id} user={CreatedBy} size="small" showName={false} />
        )
      })
    }

    if (currentUser) {
      const { id: currentUserId } = currentUser

      const activeTimer = activeTimers.find(
        (n) => n.CreatedBy.id === currentUserId
      )

      if (activeTimer) {
        const { id: timerId } = activeTimer

        buttons.push(
          <IconButton
            key="stop"
            onClick={() =>
              updateTimer({
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
            className={classes.button}
          >
            <StopIcon />
          </IconButton>
        )
      } else {
        buttons.push(
          <IconButton
            key="start"
            onClick={() =>
              createTimer({
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
            className={classes.button}
          >
            <StartIcon />
          </IconButton>
        )
      }
    }

    return (
      <Grid container spacing={8} alignItems="center" className={classes.root}>
        <Grid item xs className={classes.name}>
          {name}
        </Grid>

        {buttons.map((n, index) => {
          return (
            <Grid item key={index}>
              {n}
            </Grid>
          )
        })}
      </Grid>
    )
  }
}

export default compose(
  // graphql(createTaskProcessor, {
  //   name: "createTask",
  // }),
  graphql(updateTaskProcessor, {
    // name: "updateTask",
  }),
  graphql(createTimerProcessor, {
    name: 'createTimer',
  }),
  graphql(updateTimerProcessor, {
    name: 'updateTimer',
  })
)(withStyles(styles)((props) => <DataTaskCustom {...props} />))
