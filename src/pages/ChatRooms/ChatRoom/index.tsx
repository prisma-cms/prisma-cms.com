import Head from 'next/head'
import React, { useMemo } from 'react'
import {
  useChatRoomQuery,
  ChatRoomDocument,
  ChatRoomQuery,
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

const ChatRoomPage: Page = () => {
  const router = useRouter()

  const { query } = router

  const queryVariables = useMemo(() => {
    return {
      ...getQueryParams(query),
    }
  }, [query])

  const response = useChatRoomQuery({
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
  //   ChatRoomConnectionQuery | null | undefined
  // >(queryResult.data)

  // const objects = useMemo(() => {
  //   const objects: ChatRoomConnectionChatRoomFragment[] = []

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
        <title>Чат-комната {response.data?.object?.name}</title>
        <meta
          name="description"
          content={`Все сообщения в чат-комнате "${response.data?.object?.name}"`}
        />
      </Head>

      <View
        // {...queryResult}
        // loading={loading}
        // // data={response || null}
        object={response.data?.object}
        // count={response?.objectsConnection.aggregate.count}
        // variables={variables}
        // page={page}
      />
    </>
  )
}

ChatRoomPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  // TODO Fix private rooms access
  const result = await apolloClient.query<ChatRoomQuery>({
    query: ChatRoomDocument,

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

export default ChatRoomPage
