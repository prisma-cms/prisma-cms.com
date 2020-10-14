import React from 'react'

import PropTypes from 'prop-types'

import Page from '../../layout'

import PageNotFound from '../../404'

import View from './view'

import { TopicConnector as Connector } from '../query'

export class TopicPage extends Page {
  static propTypes = {
    ...Page.propTypes,
    View: PropTypes.func.isRequired,
  }

  static defaultProps = {
    ...Page.defaultProps,
    View,
  }

  setPageMeta(meta = {}) {
    const {
      data: { object: topic },
    } = this.props

    if (!topic) {
      return
    }

    const { name, longtitle, uri } = topic

    return super.setPageMeta({
      title: longtitle || name,
      canonical: uri,
      ...meta,
    })
  }

  render() {
    const { View, data, ...other } = this.props

    const { object, loading } = data

    if (!object) {
      if (loading) {
        return null
      } else {
        return <PageNotFound title="Топик не найден" />
      }
    }

    return super.render(<View data={data} onSave={this.onSave} {...other} />)
  }
}

const TopicConnector = (props) => {
  const { getCommentsText = true } = props

  return (
    <Connector View={TopicPage} getCommentsText={getCommentsText} {...props} />
  )
}

// export default TopicPage;
export default TopicConnector
