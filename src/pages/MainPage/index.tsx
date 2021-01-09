/**
 * Blog and MainPage resources have same url mask like "/blog/..."
 * so we need load resource and switch like type
 */

import React, { useMemo } from 'react'
import {
  useMainPageQuery,
  MainPageDocument,
  MainPageQuery,
} from 'src/modules/gql/generated'

import { Page } from '../_App/interfaces'
import MainPageView from './View'
import { NextSeo } from 'next-seo'

const MainPage: Page = () => {
  const response = useMainPageQuery({
    onError: console.error,
  })

  return useMemo(
    () => (
      <>
        <NextSeo
          title="PrismaCMS"
          description="Бесплатный JavaScript-фреймворк на базе NextJS + GraphQL"
        />

        <MainPageView data={response.data} />
      </>
    ),
    [response.data]
  )
}

MainPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  await apolloClient.query<MainPageQuery>({
    query: MainPageDocument,
  })

  return {}
}

export default MainPage
