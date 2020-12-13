import Head from 'next/head'
import React, { useCallback, useMemo, useState } from 'react'
import {
  TasksConnectionDocument,
  TasksConnectionQueryVariables,
  useTasksConnectionQuery,
  TasksConnectionQuery,
  TasksConnectionTaskFragment,
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

  const objects = useMemo(() => {
    const objects: TasksConnectionTaskFragment[] = []

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

  const [showAll, setShowAll] = useState(false)

  const createTimerProcessor = useCallback(async () => {
    console.error('createTimerProcessor mutation required')
  }, [])

  const updateTimerProcessor = useCallback(async () => {
    console.error('updateTimerProcessor mutation required')
  }, [])

  const createTaskProcessor = useCallback(async () => {
    console.error('createTaskProcessor mutation required')
  }, [])

  const updateTaskProcessor = useCallback(async () => {
    console.error('updateTaskProcessor mutation required')
  }, [])

  const deleteTaskReaction = useCallback(async () => {
    console.error('deleteTaskReaction mutation required')
  }, [])

  const setFilters = useCallback((filters: any) => {
    console.error('setFilters impementation required', filters)
  }, [])

  return (
    <>
      <Head>
        <title>Задачи</title>
        <meta name="description" content="Все задачи" />
      </Head>
      <View
        // {...queryResult}
        loading={loading}
        // data={response || null}
        objects={objects}
        count={response?.objectsConnection.aggregate.count}
        variables={variables}
        page={page}
        showAll={showAll}
        setShowAll={setShowAll}
        createTimerProcessor={createTimerProcessor}
        updateTimerProcessor={updateTimerProcessor}
        createTaskProcessor={createTaskProcessor}
        updateTaskProcessor={updateTaskProcessor}
        deleteTaskReaction={deleteTaskReaction}
        setFilters={setFilters}
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

  return {
    layout: {
      variant: 'fullwidth',
    },
  }
}

export default TasksPage
