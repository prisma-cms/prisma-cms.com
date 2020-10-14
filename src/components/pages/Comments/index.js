import React from 'react'
import PropTypes from 'prop-types'

import Page from '../layout'

import { CommentsConnector } from './query'

import View from './View'

class CommentsPage extends Page {
  static propTypes = {
    ...Page.propTypes,
    first: PropTypes.number.isRequired,
    orderBy: PropTypes.string.isRequired,
  }

  static defaultProps = {
    ...Page.defaultProps,
    first: 10,
    orderBy: 'createdAt_DESC',
    View,
  }

  setPageMeta(meta = {}) {
    return super.setPageMeta({
      title: 'Комментарии',
      ...meta,
    })
  }

  render() {
    const { first, where, ...other } = this.props

    const { uri } = this.context

    let { page } = uri.query(true)

    let skip

    page = (page && parseInt(page)) || 0

    if (first && page > 1) {
      skip = (page - 1) * first
    }

    return super.render(
      <CommentsConnector
        where={where}
        first={first}
        skip={skip}
        page={page}
        {...other}
      />
    )
  }
}

export default CommentsPage
