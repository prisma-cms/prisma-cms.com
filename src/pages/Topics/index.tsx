import Head from 'next/head'
import React, { useMemo } from 'react'
import {
  ResourceType,
  TopicsConnectionDocument,
  TopicsConnectionQueryVariables,
  useTopicsConnectionQuery,
  TopicsConnectionTopicFragment,
} from 'src/modules/gql/generated'

import { Page, NextPageContextCustom } from '../_App/interfaces'
import { useRouter, NextRouter } from 'next/router'
import { TopicsView } from './View'

const first = 10

const topicsVariables: TopicsConnectionQueryVariables = {
  where: {
    type: ResourceType.TOPIC,
  },
  first,
}

export const getTopicsVariables = (
  router: NextRouter | NextPageContextCustom,
  where?: TopicsConnectionQueryVariables['where']
) => {
  let skip: number | undefined

  const page =
    (router.query.page &&
      typeof router.query.page === 'string' &&
      parseInt(router.query.page)) ||
    0

  if (page > 1) {
    skip = (page - 1) * first
  }

  return {
    ...topicsVariables,
    where: {
      ...topicsVariables.where,
      ...where,
    },
    skip,
    first,
    page,
  }
}

const TopicsPage: Page = () => {
  const router = useRouter()

  const { page, ...queryVariables } = useMemo(() => {
    return getTopicsVariables(router)
  }, [router])

  const response = useTopicsConnectionQuery({
    variables: queryVariables,
    onError: console.error,
  })

  const { variables, loading } = response

  const objects = useMemo(() => {
    const objects: TopicsConnectionTopicFragment[] = []

    return (
      response.data?.objectsConnection.edges.reduce((curr, next) => {
        if (next?.node) {
          curr.push(next.node)
        }

        return curr
      }, objects) ?? []
    )
  }, [response.data?.objectsConnection.edges])

  return (
    <>
      <Head>
        <title>Публикации</title>
        <meta name="description" content="Все публикации" />
      </Head>

      <TopicsView
        loading={loading}
        objects={objects}
        count={response.data?.objectsConnection.aggregate.count}
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
    variables: getTopicsVariables(context),
  })

  return {}
}

export default TopicsPage
