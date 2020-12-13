import { CodeChallengeContext } from '../Context'
import '../rechallenge/transformers'
// import { transformers, transformersPreview } from '../rechallenge/transformers';

// the config files are created during the build, but not before linting
// import { filename as runner } from '../config/frame-runner.json'
// import { filename as testEvaluator } from '../config/test-evaluator.json'

// console.log('runner', runner)
// console.log('testEvaluator', testEvaluator)

type File = CodeChallengeContext['challengeData']['file']

const applyFunction = (fn: Function) =>
  async function (file: File) {
    try {
      if (file.error) {
        return file
      }
      // console.log("applyFunction this", this);
      // const newFile = await fn.call(this, file)
      const newFile = await fn(file)
      if (typeof newFile !== 'undefined') {
        return newFile
      }
      return file
    } catch (error) {
      return { ...file, error }
    }
  }

export const composeFunctions = (...fns: Function[]) =>
  fns.map(applyFunction).reduce((f, g) => (x) => f(x).then(g))

export function buildSourceMap(files: File[]) {
  return files.reduce<Record<string, string>>((sources, file) => {
    sources[file.name] = file.source || file.contents
    return sources
  }, {})
}

export function checkFilesErrors(files: File[]) {
  const errors = files.filter(({ error }) => error).map(({ error }) => error)
  if (errors.length) {
    throw errors
  }
  return files
}
