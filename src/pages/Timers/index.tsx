import Head from 'next/head'
import React, { useMemo, useState } from 'react'
import {
  TimersConnectionDocument,
  TimersConnectionQueryVariables,
  useTimersConnectionQuery,
  TimersConnectionQuery,
  TimersConnectionTimerFragment,
} from 'src/modules/gql/generated'

import View from './View'

import { Page } from '../_App/interfaces'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

const first = 10

const defaultVariables: TimersConnectionQueryVariables = {
  where: {},
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

const TimersPage: Page = () => {
  const router = useRouter()

  const { query } = router

  const { page, ...queryVariables } = useMemo(() => {
    return {
      ...defaultVariables,
      ...getQueryParams(query),
    }
  }, [query])

  const queryResult = useTimersConnectionQuery({
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
    TimersConnectionQuery | null | undefined
  >(queryResult.data)

  const objects = useMemo(() => {
    const objects: TimersConnectionTimerFragment[] = []

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
        <title>Таймеры</title>
        <meta
          name="description"
          content="Журналы выполнения задач по времени"
        />
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

TimersPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  await apolloClient.query({
    query: TimersConnectionDocument,

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

export default TimersPage
