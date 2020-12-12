import Head from 'next/head'
import React, { useMemo } from 'react'
import {
  useUserQuery,
  UserDocument,
  UserQuery,
} from 'src/modules/gql/generated'

import View from './View'

import { Page, NextPageContextCustom } from '../../_App/interfaces'
import { useRouter, NextRouter } from 'next/router'

function getVariables(router: NextRouter | NextPageContextCustom) {
  return {
    where: {
      username:
        router.query.username && typeof router.query.username === 'string'
          ? router.query.username
          : undefined,
    },
  }
}

const UserPage: Page = () => {
  const router = useRouter()

  const variables = useMemo(() => {
    return getVariables(router)
  }, [router])

  const response = useUserQuery({
    variables,
    onError: console.error,
  })

  return (
    <>
      <Head>
        <title>
          {response.data?.object?.fullname || response.data?.object?.username}
        </title>
        <meta
          name="description"
          content={`Страница пользователя ${
            response.data?.object?.fullname || response.data?.object?.username
          }`}
        />
      </Head>

      <View object={response.data?.object} />
    </>
  )
}

UserPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  // TODO Fix private rooms access
  const result = await apolloClient.query<UserQuery>({
    query: UserDocument,

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

export default UserPage
