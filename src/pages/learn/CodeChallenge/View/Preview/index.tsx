/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useContext, useMemo } from 'react'
import Context from '../../Context'
import { challengeTypes } from '../../utils/challengeTypes'
// import buildJSChallenge from '../../hooks/useExecuteChallenge/executeChallenge/buildFunctions/buildJSChallenge'
// import executeCancellableChallengeSaga from '../SidePanel/hooks/useExecuteChallenge/executeChallenge'
import { PreviewProps } from './interfaces'
// import PropTypes from 'prop-types';
import { CodeChallengePreviewStyled } from './styles'
import PreviewHtml from './type/HTML'
import PreviewModern from './type/Modern'

// import { previewMounted } from '../redux';

const Preview: React.FC<PreviewProps> = (props) => {
  const context = useContext(Context)

  const challenge = context?.challenge

  const iframeToggle = props.iframeStatus ? 'disable' : 'enable'

  const frameContent = useMemo(() => {
    switch (challenge?.challengeType) {
      case undefined:
        return null

      case challengeTypes.modern:
        return <PreviewModern />

      default:
        return <PreviewHtml />
    }
  }, [challenge?.challengeType])

  return (
    <CodeChallengePreviewStyled
      className={`challenge-preview ${iframeToggle}-iframe`}
    >
      {frameContent}
    </CodeChallengePreviewStyled>
  )
}

export default Preview
