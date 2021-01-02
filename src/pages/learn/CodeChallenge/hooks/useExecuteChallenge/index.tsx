/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { useCallback, useContext } from 'react'
import executeChallenge from './executeChallenge'
import Context, { TestResult } from '../../Context'
import { ChallengeTestIFrameElement } from '../../View/Preview'
import jquery from 'jquery'
import {
  CreateCodeChallengeCompletionProcessorDocument,
  CreateCodeChallengeCompletionProcessorMutation,
  CreateCodeChallengeCompletionProcessorMutationVariables,
  CreateTimerProcessorMutation,
  CreateTimerProcessorMutationVariables,
  CreateTimerProcessorDocument,
  UpdateCodeChallengeCompletionProcessorMutation,
  UpdateCodeChallengeCompletionProcessorMutationVariables,
  UpdateCodeChallengeCompletionProcessorDocument,
} from 'src/modules/gql/generated'
import PrismaContext, { PrismaCmsContext } from '@prisma-cms/context'

function useExecuteChallenge() {
  const context = useContext(Context)
  const prismaContext = useContext(PrismaContext) as PrismaCmsContext

  const client = prismaContext.client

  const callback = useCallback(async () => {
    if (!context) {
      return
    }

    const user = context.user
    let codeChallengeCompletion = context.codeChallengeCompletion
    const challenge = context.challenge

    /**
     * Если пользователь авторизован и статус отсутствует,
     * сначала регистрируем таску
     */

    if (user) {
      if (!codeChallengeCompletion) {
        const result = await client.mutate<
          CreateCodeChallengeCompletionProcessorMutation,
          CreateCodeChallengeCompletionProcessorMutationVariables
        >({
          mutation: CreateCodeChallengeCompletionProcessorDocument,
          variables: {
            data: {
              CodeChallenge: {
                connect: {
                  id: challenge.id,
                },
              },
            },
          },
        })

        // console.log('CreateCodeChallengeCompletionProcessorDocument result', result);

        if (result.data?.response.success === true) {
          codeChallengeCompletion = result.data.response.data

          await prismaContext.apiClientResetStore()
        }

        return
      } else {
        /**
         * Иначе смотрим по статусу.
         * Если таймер отсутствует, надо запустить таймер
         */

        //  const timer = codeChallengeCompletion.Task.
        const [ActiveTimer] = user.Timers ?? []

        if (
          !ActiveTimer ||
          ActiveTimer.stopedAt ||
          ActiveTimer?.Task.id !== codeChallengeCompletion.Task.id
        ) {
          const result = await client.mutate<
            CreateTimerProcessorMutation,
            CreateTimerProcessorMutationVariables
          >({
            mutation: CreateTimerProcessorDocument,
            variables: {
              data: {
                Task: {
                  connect: {
                    id: codeChallengeCompletion.Task.id,
                  },
                },
              },
            },
          })

          // console.log('CreateCodeChallengeCompletionProcessorDocument result', result);

          if (result.data?.response.success === true) {
            await prismaContext.apiClientResetStore()
          }
        }
      }
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

    let success = false
    const content = context.challengeData.file.contents || ''

    /**
     * Проверяем, если нет ошибок, то отмечаем тест выполненным
     */
    if (
      testsResults.length &&
      testsResults.findIndex((n) => n.pass !== true) === -1
    ) {
      success = true
    }

    if (codeChallengeCompletion) {
      const result = await client.mutate<
        UpdateCodeChallengeCompletionProcessorMutation,
        UpdateCodeChallengeCompletionProcessorMutationVariables
      >({
        mutation: UpdateCodeChallengeCompletionProcessorDocument,
        variables: {
          data: {
            success,
            content,
          },
          where: {
            id: codeChallengeCompletion.id,
          },
        },
      })

      if (result.data?.response.success === true && success) {
        await prismaContext.apiClientResetStore()
      }
    }

    context.setTestResults(testsResults)
  }, [client, context, prismaContext])

  return callback
}

export default useExecuteChallenge
