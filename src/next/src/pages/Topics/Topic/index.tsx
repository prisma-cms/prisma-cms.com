import React from 'react'
import { TopicDocument, TopicQuery } from 'src/modules/gql/generated'

import View from './View'

import { Page } from '../../_App/interfaces'
import { TopicPageProps } from './interfaces'
import { NextSeo } from 'next-seo'

const TopicPage: Page<TopicPageProps> = (props) => {
  const { queryResult } = props

  const name = queryResult.data.object?.name
  const longtitle = queryResult.data.object?.longtitle

  return (
    <>
      <NextSeo title={name} description={longtitle || name} />

      <View data={queryResult || null} />
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
