import React, { Component } from 'react'

import PropTypes from 'prop-types'

import UserLink from '@modxclub/ui/src/Link/User'

export default class UserMenuItem extends Component {
  static defaultProps = {}

  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  static contextTypes = {
    client: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { user } = this.props

    return <UserLink user={user} />
  }
}
