import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import CommentsList, {
  allCommentsQueryDocument,
  allPostsQueryVars,
} from './CommentsList'

import { Page } from '../_App/interfaces'

export const MainPage: Page = () => {
  const router = useRouter()

  const {
    query: { skip, first },
  } = router

  return (
    <>
      <Head>
        <title>Comments</title>
        <meta name="description" content="Comments from prisma-cms.com" />
      </Head>

      <CommentsList
        variables={{
          skip:
            skip && typeof skip === 'string'
              ? parseInt(skip)
              : allPostsQueryVars.skip,
          first:
            first && typeof first === 'string'
              ? parseInt(first)
              : allPostsQueryVars.first,
        }}
      />
    </>
  )
}

MainPage.getInitialProps = async (context) => {
  const { skip, first } = context.query

  const { apolloClient } = context

  await apolloClient.query({
    query: allCommentsQueryDocument,
    variables: {
      ...allPostsQueryVars,
      skip:
        skip && typeof skip === 'string'
          ? parseInt(skip)
          : allPostsQueryVars.skip,
      first:
        first && typeof first === 'string'
          ? parseInt(first)
          : allPostsQueryVars.first,
    },
  })

  return {}
}

export { allCommentsQueryDocument, allPostsQueryVars }

export default MainPage
