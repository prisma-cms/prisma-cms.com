export interface PreviewProps {
  iframeStatus: boolean
  disableIframe: boolean
  className: string
}

export interface ChallengeTestIFrameElement extends HTMLIFrameElement {
  // executeChallenge?: (props: executeChallengeProps) => AsyncGenerator<TestResult, void, unknown>;
  // executeChallenge?: typeof executeCancellableChallengeSaga;

  contentWindow:
    | (Window & {
        $?: typeof import('jquery')
        ReactDOM?: typeof import('react-dom')
        React?: typeof import('react')
      })
    | null
}
