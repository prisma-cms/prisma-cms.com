import React from 'react'
import {
  TopicDocument,
  TopicQuery,
  useTopicQuery,
  useUpdateTopicProcessorMutation,
} from 'src/modules/gql/generated'

import View from './View'

import { Page } from '../../_App/interfaces'
import { TopicPageProps } from './interfaces'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

const TopicPage: Page<TopicPageProps> = () => {
  const router = useRouter()

  const [mutate] = useUpdateTopicProcessorMutation()

  const { asPath } = router

  const queryResult = useTopicQuery({
    variables: {
      where: {
        uri: asPath,
      },
    },
    // onCompleted: (data) => {
    //   // setResponse(data.object)
    // },
    onError: console.error,
  })

  // const [response, setResponse] = useState<
  //   TopicObjectFragment | null | undefined
  // >(queryResult.data?.object)

  const object = queryResult.data?.object
  const name = object?.name
  const longtitle = object?.longtitle

  return (
    <>
      <NextSeo title={name} description={longtitle || name} />

      {object ? <View object={object} mutate={mutate} /> : null}
    </>
  )
}

TopicPage.getInitialProps = async (context) => {
  const { apolloClient, asPath } = context

  const queryResult = await apolloClient.query<TopicQuery>({
    query: TopicDocument,

    /**
     * Важно, чтобы все переменные запроса серверные и фронтовые совпадали,
     * иначе при рендеринге не будут получены данные из кеша и рендер будет пустой.
     */
    variables: {
      where: {
        uri: asPath,
      },
    },
  })

  return {
    queryResult,
    statusCode: !queryResult.data.object ? 404 : undefined,
  }
}

export default TopicPage
