import Head from 'next/head'
import React, { useCallback, useMemo, useState } from 'react'
import {
  useCodeChallengeQuery,
  CodeChallengeDocument,
  CodeChallengeQuery,
  CodeChallengeQueryVariables,
} from 'src/modules/gql/generated'

import { useRouter, NextRouter } from 'next/router'

import { Page, NextPageContextCustom } from '../../_App/interfaces'
import View from './View'

import Context, { CodeChallengeContext } from './Context'

const getCodeChallengeVariables = (
  router: NextRouter | NextPageContextCustom
) => {
  const id =
    router.query.id && typeof router.query.id === 'string'
      ? router.query.id
      : null

  const variables: CodeChallengeQueryVariables = {
    where: {
      id,
    },
  }

  return variables
}

const CodeChallengePage: Page = () => {
  const router = useRouter()

  const variables = useMemo(() => {
    return getCodeChallengeVariables(router)
  }, [router])

  const response = useCodeChallengeQuery({
    skip: !variables.where.id,
    variables,
    onError: console.error,
  })

  const object = response.data?.codeChallenge

  const [file] = useState<CodeChallengeContext['challengeData']['file']>({
    key: 'indexjs',
    head: '',
    tail: '',
    history: ['index.js'],
    name: 'index',
    ext: 'js',
    path: 'index.js',
    contents: `
        // Some comment
      `,
    error: null,
    seed: '',
  })

  const [output, setOutput] = useState<ReadonlyArray<React.ReactChild>>([
    'sdfsdferger',
  ])

  const addOutput = useCallback(
    (item: React.ReactChild) => {
      const newOutput = [...output]

      newOutput.push(item)

      setOutput(newOutput)
    },
    [output]
  )

  const context = useMemo<CodeChallengeContext | null>(() => {
    if (!object) {
      return null
    }

    const { challengeType } = object

    return {
      challenge: object,
      challengeData: {
        challengeType,
        file,
      },
      logger: {
        output,
        setOutput,
        addOutput,
      },
    }
  }, [addOutput, file, object, output])

  if (!object) {
    return null
  }

  return (
    <>
      <Head>
        <title>Задание "{object.name}".</title>
        <meta name="description" content={object.name || ''} />
      </Head>

      <Context.Provider value={context}>
        <View object={object} />
      </Context.Provider>
    </>
  )
}

CodeChallengePage.getInitialProps = async (context) => {
  const { apolloClient } = context

  const variables = getCodeChallengeVariables(context)

  const result = variables.where.id
    ? await apolloClient.query<CodeChallengeQuery>({
        query: CodeChallengeDocument,

        /**
         * Важно, чтобы все переменные запроса серверные и фронтовые совпадали,
         * иначе при рендеринге не будут получены данные из кеша и рендер будет пустой.
         */
        variables,
      })
    : null

  return {
    statusCode: !result?.data.codeChallenge ? 404 : undefined,
    layout: {
      variant: 'fullwidth',
    },
  }
}

export default CodeChallengePage
