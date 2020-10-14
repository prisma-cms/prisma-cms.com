import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql } from '@apollo/client'

import {
  // createTimerProcessor,
  updateTimerProcessor,
} from '../../query'

import Timer from '../Timer'

// const NewTimer = graphql(createTimerProcessor)(Timer);
const UpdateTimer = graphql(updateTimerProcessor)(Timer)

class TimersList extends Component {
  static propTypes = {
    timers: PropTypes.array.isRequired,
  }

  static defaultProps = {}

  render() {
    const { timers } = this.props

    if (!timers) {
      return null
    }

    return timers.map((n) => {
      const { id } = n

      return (
        <UpdateTimer
          key={id}
          data={{
            object: n,
          }}
        />
      )
    })
  }
}

export default TimersList
