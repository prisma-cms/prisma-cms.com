import React, { useMemo } from 'react'
import Head from 'next/head'
import {
  CodeChallengeBlocksDocument,
  CodeChallengeBlocksQuery,
  useCodeChallengeBlocksQuery,
  CodeChallengeBlocksBlockFragment,
} from 'src/modules/gql/generated'

import View from './View'

import { Page } from '../../_App/interfaces'

const CodeChallengeBlocksPage: Page = () => {
  const response = useCodeChallengeBlocksQuery({
    onError: console.error,
  })

  const objects = useMemo(() => {
    const objects: CodeChallengeBlocksBlockFragment[] = []

    return (
      response?.data?.codeChallengeBlocks.reduce((curr, next) => {
        if (next) {
          curr.push(next)
        }

        return curr
      }, objects) ?? []
    )
  }, [response?.data?.codeChallengeBlocks])

  return (
    <>
      <Head>
        <title>Учебные разделы</title>
        <meta name="description" content="Все учебные разделы" />
      </Head>

      <View
        objects={objects}
        count={objects.length}
        loading={response.loading}
      />
    </>
  )
}

CodeChallengeBlocksPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  const result = await apolloClient.query<CodeChallengeBlocksQuery>({
    query: CodeChallengeBlocksDocument,
  })

  return {
    statusCode: !result.data.codeChallengeBlocks.length ? 404 : undefined,
  }
}

export default CodeChallengeBlocksPage
