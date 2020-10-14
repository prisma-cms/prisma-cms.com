import React, { Component } from 'react'

import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
import 'react-reflex/styles.css'

import PropTypes from 'prop-types'
import withStyles from 'material-ui/styles/withStyles'

export const styles = {
  root: {
    height: '100%',
    display: 'flex',
    // border: '1px solid green',

    '&>.vertical.reflex-element': {
      // border: '1px solid red',
    },
  },
}

class DesktopLayout extends Component {
  static displayName = 'DesktopLayout'
  static propTypes = {
    classes: PropTypes.object.isRequired,
    challengeFile: PropTypes.shape({
      key: PropTypes.string,
    }),
    editor: PropTypes.element,
    hasPreview: PropTypes.bool,
    instructions: PropTypes.element,
    preview: PropTypes.element,
    resizeProps: PropTypes.shape({
      onStopResize: PropTypes.func,
      onResize: PropTypes.func,
    }),
    testOutput: PropTypes.element,
  }

  render() {
    const {
      classes,
      resizeProps,
      instructions,
      challengeFile,
      editor,
      testOutput,
      hasPreview,
      preview,
    } = this.props
    return (
      <ReflexContainer
        className={[classes.root, 'desktop-layout'].join(' ')}
        orientation="vertical"
      >
        <ReflexElement flex={1} {...resizeProps}>
          {instructions}
        </ReflexElement>
        <ReflexSplitter propagate={true} {...resizeProps} />
        <ReflexElement flex={1} {...resizeProps}>
          {challengeFile && (
            <ReflexContainer key={challengeFile.key} orientation="horizontal">
              <ReflexElement
                flex={1}
                propagateDimensions={true}
                renderOnResize={true}
                renderOnResizeRate={20}
                {...resizeProps}
              >
                {editor}
              </ReflexElement>
              <ReflexSplitter propagate={true} {...resizeProps} />
              <ReflexElement
                flex={0.25}
                propagateDimensions={true}
                renderOnResize={true}
                renderOnResizeRate={20}
                {...resizeProps}
              >
                {testOutput}
              </ReflexElement>
            </ReflexContainer>
          )}
        </ReflexElement>
        {hasPreview && <ReflexSplitter propagate={true} {...resizeProps} />}
        {hasPreview && (
          <ReflexElement flex={0.7} {...resizeProps}>
            {preview}
          </ReflexElement>
        )}
      </ReflexContainer>
    )
  }
}

export default withStyles(styles)(DesktopLayout)
