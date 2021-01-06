/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useContext, useMemo, useState } from 'react'
import { concatHtml } from 'src/pages/learn/CodeChallenge/rechallenge/builders'
import Context from '../../../../Context'
import buildJSChallenge from '../../../../hooks/useExecuteChallenge/executeChallenge/buildFunctions/buildJSChallenge'

const PreviewModern: React.FC = () => {
  // console.log('Preview props', props);

  // const frameRef = React.createRef<ChallengeTestIFrameElement>()

  // const frameRef = useCallback((el) => {

  // });

  // console.log('setFrame frame', frame);

  const context = useContext(Context)

  // console.log('Preview context', context);

  const challenge = context?.challenge

  // console.log('challenge', challenge);

  const challengeData = context?.challengeData

  const file = challengeData?.file

  const [build, setBuild] = useState<string | null>(null)

  /**
   * Компиллируем код и если успешно скомпиллирован, рендерим его
   */
  useMemo(async () => {
    if (!challengeData) {
      return
    }

    if (!file || file.ext !== 'jsx') {
      return
    }

    const buildData = await buildJSChallenge(challengeData, true).catch(
      (error: Error[]) => {
        console.error(error)

        // throw new Error ("sdfsdf");
        return error
      }
    )

    if (buildData && !Array.isArray(buildData) && buildData.build) {
      setBuild(buildData.build)
    } else {
      setBuild(null)
    }

    // console.log('buildData', buildData);
  }, [challengeData, file])

  const frameContent = useMemo(() => {
    const required = ((challenge?.required ?? []) as {
      src?: string
      link?: string
    }[]).concat([
      {
        src: 'https://unpkg.com/@babel/standalone/babel.min.js',
      },
    ])

    const template = challenge?.template
    // const files = (file ? [file] : []) as TestFile[]
    // const files: TestFile[] = [];

    const files: {
      contents: string
    }[] = []

    if (build) {
      files.push({
        contents: `<script type="text/babel">
        ${build}
        </script>`,
      })
    }

    const html = challenge
      ? concatHtml({ required, template, files })
      : '<head /><body />'

    return (
      <iframe
        className={'challenge-preview-frame'}
        id="tests-frame"
        title="Challenge Preview"
        srcDoc={html}
      />
    )
  }, [build, challenge])

  return frameContent
}

export default PreviewModern
