import React from 'react'

import Page from '../layout'

import Forum from '../../view/forum'

export class TopicsPage extends Page {
  setPageMeta() {
    return super.setPageMeta({
      title: 'Публикации',
    })
  }

  render() {
    const { ...other } = this.props

    const { getQueryFragment } = this.context

    return super.render(
      <Forum getQueryFragment={getQueryFragment} {...other} />
    )
  }
}

export default TopicsPage
