import Head from 'next/head'
import React, { useMemo } from 'react'
import {
  useCodeChallengeBlockQuery,
  CodeChallengeBlockDocument,
  CodeChallengeBlockQuery,
} from 'src/modules/gql/generated'

import { Page, NextPageContextCustom } from '../../../_App/interfaces'
import { useRouter, NextRouter } from 'next/router'
import CodeChallengeBlocksPageBlockView from '../View/CodeChallengeBlocksPageBlockView'

function getVariables(router: NextRouter | NextPageContextCustom) {
  return {
    where: {
      id:
        router.query.id && typeof router.query.id === 'string'
          ? router.query.id
          : '',
    },
  }
}

const CodeChallengeBlockPage: Page = () => {
  const router = useRouter()

  const variables = useMemo(() => {
    return getVariables(router)
  }, [router])

  const response = useCodeChallengeBlockQuery({
    variables,
    onError: console.error,
  })

  const object = response.data?.object

  if (!object) {
    return null
  }

  return (
    <>
      <Head>
        <title>{object.name}</title>
        <meta name="description" content={`Задача "${object.name}"`} />
      </Head>

      <CodeChallengeBlocksPageBlockView object={object} opened={true} />
    </>
  )
}

CodeChallengeBlockPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  // TODO Fix private rooms access
  const result = await apolloClient.query<CodeChallengeBlockQuery>({
    query: CodeChallengeBlockDocument,

    /**
     * Важно, чтобы все переменные запроса серверные и фронтовые совпадали,
     * иначе при рендеринге не будут получены данные из кеша и рендер будет пустой.
     */
    variables: getVariables(context),
  })
  return {
    statusCode: !result.data.object ? 404 : undefined,
  }
}

export default CodeChallengeBlockPage
