/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { useCallback, useContext } from 'react'
import executeChallenge from './executeChallenge'
import Context, { TestResult } from '../../../../Context'
import { ChallengeTestIFrameElement } from '../../../Preview'
import jquery from 'jquery'

function useExecuteChallenge() {
  const context = useContext(Context)

  const callback = useCallback(async () => {
    if (!context) {
      return
    }

    const frame = global.document.querySelector<ChallengeTestIFrameElement>(
      'iframe#tests-frame'
    )

    // Reset logger
    context.logger.setOutput([])

    const output: React.ReactChild[] = []

    let range: AsyncGenerator<TestResult | Error, void, unknown> | undefined

    if (frame) {
      // range = frame.executeChallenge?.call(frame.contentWindow, {
      //   context,
      //   jquery: frame.contentWindow?.$,
      // })
      range = executeChallenge?.call(frame.contentWindow, {
        context,
        jquery: frame.contentWindow?.$,
      })
    } else {
      range = executeChallenge({
        context,
        jquery,
      })
    }

    const testsResults: TestResult[] = []

    if (range) {
      for await (const value of range) {
        if (value instanceof Error) {
          output.push(<pre>{value.message}</pre>)
        } else {
          const message = value.err?.message

          if (message) {
            output.push(message)
          }

          testsResults.push(value)
        }
      }
    }

    // Set new output
    context.logger.setOutput(output)

    context.setTestResults(testsResults)
  }, [context])

  return callback
}

export default useExecuteChallenge
