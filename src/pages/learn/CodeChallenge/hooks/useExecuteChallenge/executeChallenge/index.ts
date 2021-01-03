/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/ban-ts-ignore */

import * as chai from 'chai'
import {
  CodeChallengeContext,
  TestResult,
} from 'src/pages/learn/CodeChallenge/Context'
import buildJSChallenge from './buildFunctions/buildJSChallenge'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line
let previewTask: any

export type executeChallengeProps = {
  context: NonNullable<CodeChallengeContext>
  jquery: any
}

export default async function* executeCancellableChallengeSaga(
  props: executeChallengeProps
): AsyncGenerator<TestResult | Error, void, unknown> {
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const assert = chai.assert

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const $ = props.jquery

  const context = props.context

  const challengeData = context.challengeData

  const buildData = await buildJSChallenge(challengeData, true).catch(
    (error: Error[]) => {
      console.error(error)

      // throw new Error ("sdfsdf");
      return error
    }
  )

  // if (buildData instanceof Error) {
  //   yield buildData;
  //   return;
  // }
  // else

  if (Array.isArray(buildData)) {
    yield buildData[0]
    return
  }

  // const code = buildData?.build
  const code = challengeData.file.contents

  const tests = context.challenge.tests?.slice()

  while (tests && tests.length) {
    const test = tests.shift()

    if (test) {
      const { testString } = test

      let result: TestResult | undefined

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let testResult: any

      // eslint-disable-next-line prefer-const
      let __userCodeWasExecuted = false

      try {
        /* eslint-disable no-eval */
        try {
          /**
           * // TODO Здесь надо учитывать тип теста, потому что с HTML возникает логичная ошибка
           */
          const completeCode = `
            ${code}
            __userCodeWasExecuted = true;
            // __utils.toggleProxyLogger(true);
            ${testString}
          `

          testResult = eval(completeCode)
        } catch (err) {
          // console.error(err)

          if (__userCodeWasExecuted) {
            // rethrow error, since test failed.
            throw err
          }
          // log build errors
          // __utils.log(err);
          // the tests may not require working code, so they are evaluated even if
          // the user code does not get executed.
          testResult = eval(testString)
        }

        if (typeof testResult === 'function') {
          // TODO Fix logic
          await testResult('e.getUserInput')
        }

        result = { pass: true }
        yield result
      } catch (err) {
        if (!(err instanceof chai.AssertionError)) {
          console.error(err)
        }

        result = {
          pass: false,
          err: {
            message: err.message,
            stack: err.stack,
            code,
            file: context.challengeData.file,
          },
        }

        yield result
      }
    }
  }
}
