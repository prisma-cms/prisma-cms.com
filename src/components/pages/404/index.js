import React, { Component } from 'react'

import PropTypes from 'prop-types'

import PageLayout from '../layout'

import Typography from 'material-ui/Typography'

export default class PageNotFound extends PageLayout {
  static propTypes = {
    ...PageLayout.propTypes,
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
    ...PageLayout.defaultProps,
    title: 'Page not found',
  }

  setPageMeta(meta = {}) {
    const { title } = this.props

    return super.setPageMeta({
      status: 404,
      title: title,
    })
  }

  render() {
    const { title } = this.props

    return super.render(
      <Typography
        variant="title"
        style={{
          textAlign: 'center',
          margin: '50px 0',
        }}
      >
        {title}
      </Typography>
    )
  }
}
