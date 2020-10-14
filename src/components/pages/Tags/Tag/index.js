import React from 'react'

import PropTypes from 'prop-types'

import Page from '../../layout'

// import Forum from "../../../view/forum"

import View from './View'

export class TagPage extends Page {
  static propTypes = {
    ...Page.propTypes,
    View: PropTypes.func.isRequired,
    tagName: PropTypes.string.isRequired,
  }

  static defaultProps = {
    ...Page.defaultProps,
    View,
  }

  setPageMeta() {
    const { tagName } = this.props

    return super.setPageMeta({
      title: `Топики с тегом "${tagName}"`,
    })
  }

  render() {
    const { tagName, View, ...other } = this.props

    return super.render(
      <View
        data={{
          object: {
            name: tagName,
          },
        }}
        {...other}
      />
    )

    // return super.render(<Forum
    //   tagName={tagName}
    //   {...other}
    // />)
  }
}

export default TagPage
