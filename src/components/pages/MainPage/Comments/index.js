import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { CommentsConnector } from '../../Comments/query'

import View from '../../Comments/View'

class MainPageComments extends Component {
  static propTypes = {
    first: PropTypes.number.isRequired,
    orderBy: PropTypes.string.isRequired,
    View: PropTypes.func.isRequired,
  }

  static defaultProps = {
    first: 5,
    orderBy: 'createdAt_DESC',
    View,
  }

  render() {
    const { first, where, ...other } = this.props

    return <CommentsConnector where={where} first={first} {...other} />
  }
}

export default MainPageComments
