import Head from 'next/head'
import React, { useMemo, useState } from 'react'
import {
  BlogsConnectionDocument,
  BlogsConnectionQueryVariables,
  useBlogsConnectionQuery,
  BlogsConnectionQuery,
  ResourceType,
  BlogsConnectionResourceFragment,
} from 'src/modules/gql/generated'

import View from './View'

import { Page } from '../_App/interfaces'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

const first = 10

const defaultVariables: BlogsConnectionQueryVariables = {
  where: {
    type_in: [ResourceType.BLOG, ResourceType.PERSONALBLOG],
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

const BlogsPage: Page = () => {
  const router = useRouter()

  const { query } = router

  const { page, ...queryVariables } = useMemo(() => {
    return {
      ...defaultVariables,
      ...getQueryParams(query),
    }
  }, [query])

  const queryResult = useBlogsConnectionQuery({
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
    BlogsConnectionQuery | null | undefined
  >(queryResult.data)

  const objects = useMemo(() => {
    const objects: BlogsConnectionResourceFragment[] = []

    return (
      response?.objectsConnection.edges.reduce((curr, next) => {
        if (next?.node) {
          curr.push(next.node)
        }

        return curr
      }, objects) ?? []
    )
  }, [response?.objectsConnection.edges])

  const { variables, loading } = queryResult

  return (
    <>
      <Head>
        <title>Блоги</title>
        <meta name="description" content="Все блоги" />
      </Head>

      <View
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

BlogsPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  await apolloClient.query({
    query: BlogsConnectionDocument,

    /**
     * Важно, чтобы все переменные запроса серверные и фронтовые совпадали,
     * иначе при рендеринге не будут получены данные из кеша и рендер будет пустой.
     */
    variables: {
      ...defaultVariables,
      ...getQueryParams(context.query),
    },
  })

  return {}
}

export default BlogsPage
