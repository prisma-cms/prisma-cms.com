import React from 'react'

import Page from '../../../layout'

import PageNotFound from '../../../404'
import { graphql } from '@apollo/client'

import { Timer as TimerQuery, updateTimerProcessor } from '../query'

import TimerView from '../View/Timer'

// import { Typography } from 'material-ui';

// import {
//   Link,
// } from "../../../../components/ui";

const UpdateTimer = graphql(updateTimerProcessor)(TimerView)

class TimerPage extends Page {
  static propTypes = {
    ...Page.propTypes,
  }

  static defaultProps = {
    ...Page.defaultProps,
  }

  setPageMeta(meta = {}) {
    const {
      data: { object: timer },
    } = this.props

    if (!timer) {
      return
    }

    const { Task: Task } = timer

    const { name } = Task || {}

    return super.setPageMeta({
      title: `Таймер к задаче ${name}`,
      ...meta,
    })
  }

  render() {
    const { data, ...other } = this.props

    const { object: timer, loading } = data

    if (!timer) {
      if (loading) {
        return null
      } else {
        return <PageNotFound />
      }
    }

    return super.render(
      <div>
        <UpdateTimer data={data} linkType="target" {...other} />
      </div>
    )
  }
}

export default (props) => {
  return <TimerQuery View={TimerPage} {...props} />
}
