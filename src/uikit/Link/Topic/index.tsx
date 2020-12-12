import React, { Component } from 'react'
import Typography from 'material-ui/Typography'

import Link from '..'
import { TopicLinkProps } from './interfaces'

export class TopicLink extends Component<TopicLinkProps> {
  render() {
    const { object, children, ...other } = this.props

    if (!object) {
      return null
    }

    const { name, longtitle, uri } = object

    if (!name || !uri) {
      return null
    }

    return (
      <Link href={uri} title={longtitle || name} {...other}>
        {children || <Typography component="span">{name}</Typography>}
      </Link>
    )
  }
}

export default TopicLink
