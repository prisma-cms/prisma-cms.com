import React from 'react'
import { TaskViewProps } from './interfaces'
import { TaskViewStyled } from './styles'
// import Link from 'next/link'
import Typography from 'material-ui/Typography'

import ProjectLink from 'src/uikit/Link/Project'

const TaskView: React.FC<TaskViewProps> = (props) => {
  const task = props.object

  if (!task) {
    return null
  }

  return (
    <TaskViewStyled>
      <Typography variant="title">{task.name}</Typography>

      {task.TaskProjects?.map((n) => {
        const project = n.Project
        return (
          <div key={project.id}>
            Проект: <ProjectLink object={project} />
          </div>
        )
      })}
    </TaskViewStyled>
  )
}

export default TaskView
