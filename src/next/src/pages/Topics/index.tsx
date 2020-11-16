import Head from 'next/head'
import React, { useMemo, useState } from 'react'
import {
  ResourceType,
  TopicsConnectionDocument,
  TopicsConnectionQueryVariables,
  useTopicsConnectionQuery,
  TopicsConnectionQuery,
  TopicsConnectionTopicFragment,
} from 'src/modules/gql/generated'

import { Page } from '../_App/interfaces'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { TopicsView } from './View'

const first = 10

const topicsVariables: TopicsConnectionQueryVariables = {
  where: {
    type: ResourceType.TOPIC,
  },
  first,
}

function getQueryParams(query: ParsedUrlQuery) {
  let skip: number | undefined

  const page =
    (query.page && typeof query.page === 'string' && parseInt(query.page)) || 0

  if (page > 1) {
    skip = (page - 1) * first
  }

  return {
    skip,
    first,
    page,
  }
}

const TopicsPage: Page = () => {
  const router = useRouter()

  const { query } = router

  const { page, ...queryVariables } = useMemo(() => {
    return {
      ...topicsVariables,
      ...getQueryParams(query),
    }
  }, [query])

  const queryResult = useTopicsConnectionQuery({
    variables: queryVariables,
    onCompleted: (data) => {
      setResponse(data)
    },
    onError: console.error,
  })

  /**
   * useState используем уже после выполнения запроса, так как на стороне setState не имеет эффекта,
   * надо дефолтные данные сразу задать из полученного результата
   */
  const [response, setResponse] = useState<
    TopicsConnectionQuery | null | undefined
  >(queryResult.data)

  const { variables, loading } = queryResult

  const objects = useMemo(() => {
    const objects: TopicsConnectionTopicFragment[] = []

    return (
      response?.objectsConnection.edges.reduce((curr, next) => {
        if (next?.node) {
          curr.push(next.node)
        }

        return curr
      }, objects) ?? []
    )
  }, [response?.objectsConnection.edges])

  return (
    <>
      <Head>
        <title>Публикации</title>
        <meta name="description" content="Все публикации" />
      </Head>

      <TopicsView
        // {...queryResult}
        loading={loading}
        // data={response || null}
        objects={objects}
        count={response?.objectsConnection.aggregate.count}
        variables={variables}
        page={page}
      />
    </>
  )
}

TopicsPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  await apolloClient.query({
    query: TopicsConnectionDocument,

    /**
     * Важно, чтобы все переменные запроса серверные и фронтовые совпадали,
     * иначе при рендеринге не будут получены данные из кеша и рендер будет пустой.
     */
    variables: {
      ...topicsVariables,
      ...getQueryParams(context.query),
    },
  })

  return {}
}

export default TopicsPage
