import Head from 'next/head'
import React, { useMemo } from 'react'
import {
  CommentsConnectionDocument,
  CommentsConnectionQueryVariables,
  useCommentsConnectionQuery,
  CommentsConnectionCommentFragment,
} from 'src/modules/gql/generated'

import View from './View'

import { Page } from '../_App/interfaces'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

const first = 10

const defaultVariables: CommentsConnectionQueryVariables = {
  first,
}

function getQueryParams(query: ParsedUrlQuery) {
  const { page: queryPage } = query

  let skip: number | undefined

  const page =
    (queryPage && typeof queryPage === 'string' && parseInt(queryPage)) || 0

  if (page > 1) {
    skip = (page - 1) * first
  }

  return {
    page,
    skip,
    first,
  }
}

const CommentsPage: Page = () => {
  const router = useRouter()

  const { query } = router

  const { page, ...queryVariables } = useMemo(() => {
    return {
      ...defaultVariables,
      ...getQueryParams(query),
    }
  }, [query])

  const response = useCommentsConnectionQuery({
    variables: queryVariables,
    onError: console.error,
  })

  const objects = useMemo(() => {
    const objects: CommentsConnectionCommentFragment[] = []

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
        <title>Комментарии</title>
        <meta name="description" content="Все комментарии" />
      </Head>

      <View
        page={page}
        limit={first}
        total={response.data?.objectsConnection.aggregate.count || 0}
        objects={objects}
      />
    </>
  )
}

CommentsPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  await apolloClient.query({
    query: CommentsConnectionDocument,

    /**
     * Важно, чтобы все переменные запроса серверные и фронтовые совпадали,
     * иначе при рендеринге не будут получены данные из кеша и рендер будет пустой.
     */
    variables: {
      ...defaultVariables,
      ...getQueryParams(context.query),
    },
  })

  return {
    layout: {},
  }
}

export default CommentsPage
