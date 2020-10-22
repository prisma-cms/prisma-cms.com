import React, { Component } from 'react'

import PropTypes from 'prop-types'

import UserLink from 'src/next/src/components/ui/Link/User'

export default class UserMenuItem extends Component {
  // static defaultProps = {
  // }

  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  // static contextTypes = {
  //   client: PropTypes.object.isRequired,
  // };

  render() {
    const { user } = this.props

    return (
      <UserLink
        user={user}
        // showName={false}
        // style={{
        //   margin: 0,
        // }}
      />
    )
  }
}
