import React from 'react'

import Project from './Project'
import Grid from 'src/next/src/components/ui/Grid'
import { ProjectsListProps } from './interfaces';

const ProjectsList: React.FC<ProjectsListProps> = (props) => {

  const { projects } = props;

  return (
    <Grid container spacing={16}>
      {projects?.map((n) => {
        const { id } = n

        return (
          <Grid key={id} item xs={12} sm={6} md={4} lg={3}>
            <Project
              data={{
                object: n,
              }}
              tasksLimit={3}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default ProjectsList
