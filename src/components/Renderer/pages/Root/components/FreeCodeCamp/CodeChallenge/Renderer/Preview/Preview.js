import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import { previewMounted } from '../redux';

import './preview.css'

const mainId = 'fcc-main-frame'

class Preview extends Component {
  static propTypes = {
    className: PropTypes.string,
    disableIframe: PropTypes.bool,
    // previewMounted: PropTypes.func.isRequired
  }

  constructor(...props) {
    super(...props)

    this.state = {
      iframeStatus: props.disableIframe,
    }
  }

  // componentDidMount() {
  //   this.props.previewMounted();
  // }

  componentDidUpdate(prevProps) {
    if (this.props.disableIframe !== prevProps.disableIframe) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ iframeStatus: !this.state.iframeStatus })
    }
  }

  render() {
    const iframeToggle = this.state.iframeStatus ? 'disable' : 'enable'
    return (
      <div className={`challenge-preview ${iframeToggle}-iframe`}>
        <iframe
          className={'challenge-preview-frame'}
          id={mainId}
          title="Challenge Preview"
        />
      </div>
    )
  }
}

export default Preview
