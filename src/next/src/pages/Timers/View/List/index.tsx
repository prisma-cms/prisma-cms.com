import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import { graphql } from '@apollo/client'

// import {
//   // createTimerProcessor,
//   updateTimerProcessor,
// } from '../../query'

import Timer from '../Timer'
import { TimersListViewProps } from './interfaces'

// const NewTimer = graphql(createTimerProcessor)(Timer);
// const UpdateTimer = graphql(updateTimerProcessor)(Timer)

class TimersListView extends Component<TimersListViewProps> {
  static propTypes = {
    timers: PropTypes.array.isRequired,
  }

  static defaultProps = {}

  mutate = async (arg0: any) => {
    // TODO Прописать апдейтер
    console.error('TimersList update mutation required', arg0)
  }

  render() {
    const { timers } = this.props

    if (!timers) {
      return null
    }

    return timers.map((n) => {
      const { id } = n

      return (
        // <UpdateTimer
        <Timer
          key={id}
          data={{
            object: n,
          }}
          mutate={this.mutate}
        />
      )
    })
  }
}

export default TimersListView
