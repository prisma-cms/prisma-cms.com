import { useCallback, useContext } from 'react'
// import { CodeChallenge_Fragment } from 'src/modules/gql/generated'
import executeChallenge from './executeChallenge'
import Context from '../../../../Context'

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

    for await (const value of range) {
      const message = value.err?.message

      if (message) {
        output.push(message)
      }
    }

    // Set new output
    context.logger.setOutput(output)
  }, [context])

  return callback
}

export default useExecuteChallenge
