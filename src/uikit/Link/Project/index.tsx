import React, { Component } from 'react'

import Link from '..'

import { ProjectLinkProps } from './interfaces'

export class ProjectLink extends Component<ProjectLinkProps> {
  render() {
    const { object, ...other } = this.props

    if (!object) {
      return null
    }

    const { id, name, Resource } = object

    if (!id) {
      return null
    }

    const resourceUri = Resource?.uri

    return (
      <Link href={resourceUri || `/projects/id/${id}`} title={name} {...other}>
        {name}
      </Link>
    )
  }
}

export default ProjectLink
