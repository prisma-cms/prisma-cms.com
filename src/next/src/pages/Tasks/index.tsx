import Head from 'next/head'
import React, { useMemo, useState } from 'react'
import {
  TasksConnectionDocument,
  TasksConnectionQueryVariables,
  useTasksConnectionQuery,
  TasksConnectionQuery,
} from 'src/modules/gql/generated'

import View from './View'

import { Page } from '../_App/interfaces'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

const first = 12

const defaultVariables: TasksConnectionQueryVariables = {
  where: {},
  first,
}

function getQueryParams(query: ParsedUrlQuery) {
  const { page: queryPage, ...where } = query

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
    where,
  }
}

const TasksPage: Page = () => {
  const router = useRouter()

  const { query } = router

  const { page, ...queryVariables } = useMemo(() => {
    return {
      ...defaultVariables,
      ...getQueryParams(query),
    }
  }, [query])

  const queryResult = useTasksConnectionQuery({
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
    TasksConnectionQuery | null | undefined
  >(queryResult.data)

  const { variables } = queryResult

  const [showAll, setShowAll] = useState(false)

  return (
    <>
      <Head>
        <title>Задачи</title>
        <meta name="description" content="Все задачи" />
      </Head>

      <View
        // {...queryResult}
        data={response || null}
        variables={variables}
        page={page}
        showAll={showAll}
        setShowAll={setShowAll}
        createTimerProcessor={async () => {
          console.error('createTimerProcessor mutation required')
        }}
        updateTimerProcessor={async () => {
          console.error('updateTimerProcessor mutation required')
        }}
        createTaskProcessor={async () => {
          console.error('createTaskProcessor mutation required')
        }}
        updateTaskProcessor={async () => {
          console.error('updateTaskProcessor mutation required')
        }}
        deleteTaskReaction={async () => {
          console.error('deleteTaskReaction mutation required')
        }}
        setFilters={(filters: any) => {
          console.error('setFilters impementation required', filters)
        }}
      />
    </>
  )
}

TasksPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  await apolloClient.query({
    query: TasksConnectionDocument,

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

export default TasksPage
