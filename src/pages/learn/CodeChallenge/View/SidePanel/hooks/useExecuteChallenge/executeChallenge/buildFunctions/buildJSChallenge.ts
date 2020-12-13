import { CodeChallengeContext } from 'src/pages/learn/CodeChallenge/Context'
import {
  checkFilesErrors,
  composeFunctions,
  buildSourceMap,
} from 'src/pages/learn/CodeChallenge/utils/build'
import { challengeTypes } from 'src/pages/learn/CodeChallenge/utils/challengeTypes'
import {
  transformersPreview,
  transformers,
} from '../../../../../../utils/transformers'

type File = CodeChallengeContext['challengeData']['file']

type buildJSChallengeProps = {
  file: File
}

/**
 * TODO: Fix check errors
 */
function buildJSChallenge(props: buildJSChallengeProps, preview = false) {
  const { file } = props

  const files: Record<string, File> = {
    indexjs: file,
  }

  const pipeLine = preview
    ? composeFunctions(...transformersPreview)
    : composeFunctions(...transformers)
  const finalFiles = Object.keys(files)
    .map((key) => files[key])
    .map(pipeLine)

  return Promise.all(finalFiles)
    .then(checkFilesErrors)
    .then((files) => ({
      challengeType: challengeTypes.js,
      build: files
        .reduce<string[]>(
          (body, file) => [...body, file.head, file.contents, file.tail],
          []
        )
        .join('\n'),
      sources: buildSourceMap(files),
    }))
}

export default buildJSChallenge
