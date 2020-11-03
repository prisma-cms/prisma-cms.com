import Head from 'next/head'
import React, { useMemo, useState } from 'react'
import {
  TechnologiesConnectionDocument,
  TechnologiesConnectionQueryVariables,
  useTechnologiesConnectionQuery,
  TechnologiesConnectionQuery,
} from 'src/modules/gql/generated'

import View from './View'

import { Page } from '../_App/interfaces'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

const first = 10

const defaultVariables: TechnologiesConnectionQueryVariables = {
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

const TechnologiesPage: Page = () => {
  const router = useRouter()

  const { query } = router

  const { page, ...queryVariables } = useMemo(() => {
    return {
      ...defaultVariables,
      ...getQueryParams(query),
    }
  }, [query])

  const queryResult = useTechnologiesConnectionQuery({
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
    TechnologiesConnectionQuery | null | undefined
  >(queryResult.data)

  const { variables } = queryResult

  return (
    <>
      <Head>
        <title>Технологии</title>
        <meta
          name="description"
          content="Все технологии, используемые программистами"
        />
      </Head>

      <View
        // {...queryResult}
        data={response || null}
        variables={variables}
        page={page}
      />
    </>
  )
}

TechnologiesPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  await apolloClient.query({
    query: TechnologiesConnectionDocument,

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

export default TechnologiesPage
