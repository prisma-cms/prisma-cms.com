import React from 'react'

import {
  TaskView as CooperatorTaskView,
  styles,
  TaskLink,
  // updateTaskProcessor,
  // createTimerProcessor,
  // updateTimerProcessor,
  processors,
} from '../../../../../Tasks/View/Task'

import withStyles from 'material-ui/styles/withStyles'
import { Grid } from '@modxclub/ui'
// import { graphql, compose } from '@apollo/client';

class TaskView extends CooperatorTaskView {
  // static propTypes = {
  //   item: PropTypes.object.isRequired,
  // };

  renderHeader() {
    return null
  }

  renderDefaultView() {
    const object = this.getObjectWithMutations()

    const inEditMode = this.isInEditMode()

    let output

    if (inEditMode) {
      output = this.getTextField({
        name: 'name',
        label: 'Название задачи',
      })
    } else {
      output = <TaskLink object={object} />
    }

    return (
      <Grid container spacing={8} alignItems="center">
        <Grid item xs={inEditMode}>
          {output}
        </Grid>

        <Grid item>{this.getButtons()}</Grid>

        <Grid item>{this.renderActiveTimers()}</Grid>
      </Grid>
    )
  }
}

export default processors(
  withStyles(styles)((props) => <TaskView {...props} />)
)
