import React, { useContext, useEffect, useMemo } from 'react'
import Context from '../../Context'
// import executeCancellableChallengeSaga from '../SidePanel/hooks/useExecuteChallenge/executeChallenge'
import { PreviewProps } from './interfaces'
// import PropTypes from 'prop-types';
import { CodeChallengePreviewStyled } from './styles'

// import { previewMounted } from '../redux';

export interface ChallengeTestIFrameElement extends HTMLIFrameElement {
  // executeChallenge?: (props: executeChallengeProps) => AsyncGenerator<TestResult, void, unknown>;
  // executeChallenge?: typeof executeCancellableChallengeSaga;

  contentWindow:
    | (Window & {
        $?: typeof import('jquery')
      })
    | null
}

const Preview: React.FC<PreviewProps> = (props) => {
  // console.log('Preview props', props);

  const frameRef = React.createRef<ChallengeTestIFrameElement>()

  // console.log('Preview frameRef', frameRef);

  const context = useContext(Context)

  // console.log('Preview context', context);

  useEffect(() => {
    const frame = frameRef.current

    if (!frame) {
      return
    }

    // frame.executeChallenge = executeCancellableChallengeSaga;

    // const handler = (event: MessageEvent) => {
    //   console.log('handler event', event, event.data);
    // }

    // window.addEventListener("message", handler)

    // clean up
    // return () => window.removeEventListener("message", handler)
  }, [frameRef])

  const frame = useMemo(() => {
    const iframe = (
      <iframe
        className={'challenge-preview-frame'}
        id="tests-frame"
        title="Challenge Preview"
        ref={frameRef}
        srcDoc={`
      <!DOCTYPE html>
      <html>
        <head>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
        </head>
        <body>
          ${context?.challengeData.file.contents || ''}
        </body>
      </html>
    `}
      />
    )

    return iframe
  }, [context?.challengeData.file.contents, frameRef])

  const iframeToggle = props.iframeStatus ? 'disable' : 'enable'
  return (
    <CodeChallengePreviewStyled
      className={`challenge-preview ${iframeToggle}-iframe`}
    >
      {frame}
    </CodeChallengePreviewStyled>
  )
}

export default Preview
