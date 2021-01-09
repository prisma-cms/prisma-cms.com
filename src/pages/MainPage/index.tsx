import { NextSeo } from 'next-seo'
import React from 'react'
// import { useRouter } from 'next/router'

import { Page } from '../_App/interfaces'

export const MainPage: Page = () => {
  // const router = useRouter()

  // const {
  //   query: { skip, first },
  // } = router

  return (
    <>
      <NextSeo title="PrismaCMS" description="PrismaCMS community" />
    </>
  )
}

MainPage.getInitialProps = async () => {
  // const { skip, first } = context.query

  // const { apolloClient } = context

  // await apolloClient.query({
  //   query: allCommentsQueryDocument,
  //   variables: {
  //     ...allPostsQueryVars,
  //     skip:
  //       skip && typeof skip === 'string'
  //         ? parseInt(skip)
  //         : allPostsQueryVars.skip,
  //     first:
  //       first && typeof first === 'string'
  //         ? parseInt(first)
  //         : allPostsQueryVars.first,
  //   },
  // })

  return {}
}

export default MainPage
