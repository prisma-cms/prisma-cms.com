import { useCallback, useContext } from 'react'
// import { CodeChallenge_Fragment } from 'src/modules/gql/generated'
import executeChallenge from './executeChallenge'
import Context, { TestResult } from '../../../../Context'

function useExecuteChallenge() {
  const context = useContext(Context)

  const callback = useCallback(async () => {
    if (!context) {
      return
    }

    // Reset logger
    context.logger.setOutput([])

    const output: React.ReactChild[] = []

    const range = executeChallenge(context)

    const testsResults: TestResult[] = []

    for await (const value of range) {
      // console.log('Test result value', value);

      const message = value.err?.message

      if (message) {
        output.push(message)
      }

      testsResults.push(value)
    }

    // console.log('Test result output', output);

    // Set new output
    context.logger.setOutput(output)

    context.setTestResults(testsResults)
  }, [context])

  return callback
}

export default useExecuteChallenge
