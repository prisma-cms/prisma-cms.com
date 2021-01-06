/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import Context from '../../../../Context'
import { ChallengeTestIFrameElement } from '../../interfaces'

const PreviewHtml: React.FC = () => {
  const [frameLoaded, setFrameLoaded] = useState(false)

  // console.log('frameLoaded', frameLoaded);

  const [frame, setFrame] = useState<ChallengeTestIFrameElement | null>(null)

  // console.log('setFrame frame', frame);

  const context = useContext(Context)

  // console.log('Preview context', context);

  const challenge = context?.challenge
  // const challengeData = context?.challengeData;

  // console.log('challenge', challenge);
  // console.log('challengeData', challengeData);

  useEffect(() => {
    if (
      !frameLoaded ||
      !frame ||
      !frame.contentDocument ||
      !frame.contentDocument.body
    ) {
      return
    }

    frame.contentDocument.body.innerHTML =
      context?.challengeData.file.contents || ''
  }, [context?.challengeData.file.contents, frame, frameLoaded])

  const frameOnLoaded = useCallback(() => setFrameLoaded(true), [
    setFrameLoaded,
  ])

  const frameContent = useMemo(() => {
    // console.log('useMemo frameContent');

    const required = (context?.challenge.required ?? []) as {
      src?: string
      link?: string
    }[]

    return (
      <iframe
        className={'challenge-preview-frame'}
        id="tests-frame"
        title="Challenge Preview"
        ref={setFrame}
        onLoad={frameOnLoaded}
        srcDoc={`
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
          ${required
            .map((n) => {
              const src = n.src
              const link = n.link

              if (link && src) {
                throw new Error(
                  `A required file can not have both a src and a link: src = ${src}, link = ${link}`
                )
              }
              if (src) {
                return `<script src='${src}' type='text/javascript'></script>`
              }
              if (link) {
                return `<link href='${link}' rel='stylesheet' />`
              }
              return ''
            })
            .join('\n')}
        </head>
        ${challenge?.template || `<body />`}
      </html>
    `}
      />
    )
  }, [challenge?.template, context?.challenge.required, frameOnLoaded])

  return frameContent
}

export default PreviewHtml
