import React from 'react'

import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'

import withStyles from 'material-ui/styles/withStyles'
import { DesktopLayoutProps } from './interfaces'

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

const DesktopLayout: React.FC<DesktopLayoutProps> = (props) => {
  // static displayName = 'DesktopLayout';

  // static propTypes = {
  //   classes: PropTypes.object.isRequired,
  //   challengeFile: PropTypes.shape({
  //     key: PropTypes.string
  //   }),
  //   editor: PropTypes.element,
  //   hasPreview: PropTypes.bool,
  //   instructions: PropTypes.element,
  //   preview: PropTypes.element,
  //   resizeProps: PropTypes.shape({
  //     onStopResize: PropTypes.func,
  //     onResize: PropTypes.func
  //   }),
  //   testOutput: PropTypes.element
  // };

  const {
    classes,
    // resizeProps,
    instructions,
    challengeFile,
    editor,
    testOutput,
    hasPreview,
    preview,
  } = props

  return (
    <ReflexContainer
      className={[classes?.root, 'desktop-layout'].join(' ')}
      orientation="vertical"
    >
      <ReflexElement flex={1}>{instructions}</ReflexElement>
      <ReflexSplitter propagate={true} />
      <ReflexElement flex={1}>
        {challengeFile && (
          <ReflexContainer key={challengeFile.key} orientation="horizontal">
            <ReflexElement flex={1} propagateDimensions={true}>
              {editor}
            </ReflexElement>
            <ReflexSplitter propagate={true} />
            <ReflexElement flex={0.25} propagateDimensions={true}>
              {testOutput}
            </ReflexElement>
          </ReflexContainer>
        )}
      </ReflexElement>
      {hasPreview && <ReflexSplitter propagate={true} />}
      {hasPreview && <ReflexElement flex={0.7}>{preview}</ReflexElement>}
    </ReflexContainer>
  )
}

DesktopLayout.displayName = 'DesktopLayout'

export default withStyles(styles)((props: DesktopLayoutProps) => (
  <DesktopLayout {...props} />
))
