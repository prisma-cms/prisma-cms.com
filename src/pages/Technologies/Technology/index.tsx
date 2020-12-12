import Head from 'next/head'
import React, { useMemo } from 'react'
import {
  useTechnologyQuery,
  TechnologyDocument,
  TechnologyQuery,
} from 'src/modules/gql/generated'

import View from './View'

import { Page } from '../../_App/interfaces'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

function getQueryParams(query: ParsedUrlQuery) {
  const id = query.id

  return {
    where: {
      id: id && typeof id === 'string' ? id : '',
    },
  }
}

const TechnologyPage: Page = () => {
  const router = useRouter()

  const { query } = router

  const queryVariables = useMemo(() => {
    return {
      ...getQueryParams(query),
    }
  }, [query])

  const response = useTechnologyQuery({
    variables: queryVariables,
    // onCompleted: (data) => {
    //   setResponse(data)
    // },
    onError: console.error,
  })

  // return "dsfdsf";
  /**
   * useState используем уже после выполнения запроса, так как на стороне setState не имеет эффекта,
   * надо дефолтные данные сразу задать из полученного результата
   */
  // const [response, setResponse] = useState<
  //   TechnologyConnectionQuery | null | undefined
  // >(queryResult.data)

  // const objects = useMemo(() => {
  //   const objects: TechnologyConnectionTechnologyFragment[] = []

  //   return (
  //     response?.objectsConnection.edges.reduce((curr, next) => {
  //       if (next?.node) {
  //         curr.push(next.node)
  //       }

  //       return curr
  //     }, objects) ?? []
  //   )
  // }, [response?.objectsConnection.edges])

  // const { variables, loading } = queryResult

  return (
    <>
      <Head>
        <title>{response.data?.object?.name}</title>
        <meta name="description" content={response.data?.object?.name || ''} />
      </Head>

      <View
        // {...queryResult}
        // loading={loading}
        // // data={response || null}
        // count={response?.objectsConnection.aggregate.count}
        // variables={variables}
        // page={page}
        object={response.data?.object}
      />
    </>
  )
}

TechnologyPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  // TODO Fix private rooms access
  const result = await apolloClient.query<TechnologyQuery>({
    query: TechnologyDocument,

    /**
     * Важно, чтобы все переменные запроса серверные и фронтовые совпадали,
     * иначе при рендеринге не будут получены данные из кеша и рендер будет пустой.
     */
    variables: {
      ...getQueryParams(context.query),
    },
  })
  return {
    statusCode: !result.data.object ? 404 : undefined,
  }
}

export default TechnologyPage
