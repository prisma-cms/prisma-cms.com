import React from 'react'

import { styles, ProjectView as BaseProjectView } from '../../Project'

import { withStyles } from 'material-ui'

import { Typography } from 'material-ui'

import { CardContent } from 'material-ui/Card'

import { Link } from '@modxclub/ui'

import TasksListView from '../../Project/Tasks'

class ProjectView extends BaseProjectView {
  renderTasks() {
    const { id: projectId, ProjectTasks } = this.getObjectWithMutations() || {}

    // console.log('ProjectTasks', ProjectTasks);

    const Tasks = ProjectTasks
      ? ProjectTasks.map(({ Task }) => Task).filter((n) => n)
      : []

    // console.log('Tasks', Tasks);

    const { tasksLimit } = this.props

    const showDetails = false

    return Tasks ? (
      <CardContent>
        <Typography variant="subheading">Задачи в проекте</Typography>

        <TasksListView
          tasks={Tasks}
          showDetails={showDetails}
          tasksLimit={tasksLimit}
        />

        <Link to={`/tasks/create/${projectId}`}>
          <Typography>Поставить задачу</Typography>
        </Link>
      </CardContent>
    ) : null
  }

  // renderEditableView() {

  //   return this.renderDefaultView();

  // }
}

export default withStyles(styles)((props) => <ProjectView {...props} />)
