import React from 'react'

import { styles, ProjectView as BaseProjectView } from '../../Project'

import withStyles from 'material-ui/styles/withStyles'

import Typography from 'material-ui/Typography'

import { CardContent } from 'material-ui/Card'

import TasksListView from '../../Project/Tasks'
import { ProjectsListProjectProps } from './interfaces'
import Link from 'next/link'
// import { Project } from 'src/modules/gql/generated'

class ProjectView extends BaseProjectView<ProjectsListProjectProps> {
  static defaultProps = {
    ...BaseProjectView.defaultProps,
    classes: {},
  }

  // getObjectWithMutations(): Project {
  //   return super.getObjectWithMutations()
  // }

  renderTasks() {
    const { id: projectId, ProjectTasks } = this.getObjectWithMutations() || {}

    // console.log('ProjectTasks', ProjectTasks);

    const Tasks = ProjectTasks
      ? ProjectTasks.map(({ Task }) => Task).filter((n) => n)
      : []

    // console.log('Tasks', Tasks);

    const { tasksLimit } = this.props

    return Tasks ? (
      <CardContent>
        <Typography variant="subheading">Задачи в проекте</Typography>

        <TasksListView
          tasks={Tasks}
          tasksLimit={tasksLimit}
          // showDetails={false}
        />

        <Link href={`/tasks/create/${projectId}`}>
          <a>
            <Typography>Поставить задачу</Typography>
          </a>
        </Link>
      </CardContent>
    ) : null
  }
}

export default withStyles(styles)((props: ProjectsListProjectProps) => (
  <ProjectView {...props} />
))
