/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/ban-ts-ignore */

// import escape from 'lodash/escape'
// import { CodeChallenge_Fragment } from 'src/modules/gql/generated';
// import { CodeChallengeTest } from 'src/pages/learn/CodeChallenge/interfaces';
// import { buildChallenge } from 'src/pages/learn/CodeChallenge/utils/build'

// import * as Babel from '@babel/standalone';

import jquery from 'jquery'
import * as chai from 'chai'
import { CodeChallengeContext } from 'src/pages/learn/CodeChallenge/Context'
import buildJSChallenge from './buildFunctions/buildJSChallenge'

// @ts-ignore
global.assert = chai.assert
// @ts-ignore
global.$ = jquery

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line
let previewTask: any

export default async function* executeCancellableChallengeSaga(
  context: NonNullable<CodeChallengeContext>
) {
  const challengeData = context.challengeData

  const buildData = await buildJSChallenge(challengeData, true)

  /**
   * Code from Editor
   */
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const code = buildData.build

  // const tests: CodeChallengeTest[] = challenge.tests?.slice();
  // const tests = challenge.tests?.slice();

  const tests = context.challenge.tests?.slice()

  while (tests && tests.length) {
    const test = tests.shift()

    if (test) {
      const { testString } = test

      try {
        // eslint-disable-next-line no-eval
        const test = eval(testString)

        if (typeof test === 'function') {
          // TODO Fix logic
          await test('e.getUserInput')
        }
        yield { pass: true }
      } catch (err) {
        if (!(err instanceof chai.AssertionError)) {
          console.error(err)
        }
        yield {
          err: {
            message: err.message,
            stack: err.stack,
            code,
            file: context.challengeData.file,
          },
        }
      }
    }
  }
}
