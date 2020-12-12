import Head from 'next/head'
import React, { useMemo } from 'react'
import {
  useTaskQuery,
  TaskDocument,
  TaskQuery,
} from 'src/modules/gql/generated'

import View from './View'

import { Page, NextPageContextCustom } from '../../_App/interfaces'
import { useRouter, NextRouter } from 'next/router'

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

const TaskPage: Page = () => {
  const router = useRouter()

  const variables = useMemo(() => {
    return getVariables(router)
  }, [router])

  const response = useTaskQuery({
    variables,
    onError: console.error,
  })

  return (
    <>
      <Head>
        <title>{response.data?.object?.name}</title>
        <meta
          name="description"
          content={`Задача ${response.data?.object?.name}`}
        />
      </Head>

      <View object={response.data?.object} />
    </>
  )
}

TaskPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  // TODO Fix private rooms access
  const result = await apolloClient.query<TaskQuery>({
    query: TaskDocument,

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

export default TaskPage
