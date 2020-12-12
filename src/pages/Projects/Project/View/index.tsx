import React from 'react'
import { ProjectViewProps } from './interfaces'
import { ProjectViewStyled } from './styles'
// import Link from 'next/link'
import Typography from 'material-ui/Typography'

const ProjectView: React.FC<ProjectViewProps> = (props) => {
  const project = props.object

  if (!project) {
    return null
  }

  return (
    <ProjectViewStyled>
      <Typography variant="title">{project.name}</Typography>
    </ProjectViewStyled>
  )
}

export default ProjectView
