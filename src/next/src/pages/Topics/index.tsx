import Head from 'next/head'
import React from 'react'
import { TopicsConnectionDocument, useTopicsConnectionQuery } from 'src/modules/gql/generated'

import ForumView from 'src/components/view/forum/view'
import { GetServerSideProps } from 'next'
import { initializeApollo } from '../../lib/apolloClient'

import Grid from 'material-ui/Grid'
import Link from 'next/link';
import Button from 'material-ui/Button'

const TopicsPage: React.FC = () => {
  const queryResult = useTopicsConnectionQuery()

  return (
    <>33
      <Head>
        <title>Публикации</title>
        <meta name="description" content="Все публикации" />
      </Head>
      Публикации

      <nav
        style={{
          padding: '0 8px',
        }}
      >
        <Grid
          container
          spacing={16}
        >
          <Grid
            item
          >
            <Link
              href="/"
            >
              Main Page
            </Link>
          </Grid>
          <Grid
            item
          >
            <Link
              href="/topics"
            >
              Topics
            </Link>
          </Grid>
          <Grid
            item
          >
            <Button variant="raised" color="primary" size="small">Button</Button>
          </Grid>
        </Grid>
      </nav>


      {queryResult.data ? <ForumView {...queryResult} /> : null}44
    </>
  )
}


// TODO: Прописать общий стейт аполло
// export const getServerSideProps: GetServerSideProps = async (context) => {
export const getServerSideProps: GetServerSideProps = async () => {
  // const { skip, first } = context.query

  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: TopicsConnectionDocument,
    variables: {
      // ...allPostsQueryVars,
      // skip:
      //   skip && typeof skip === 'string'
      //     ? parseInt(skip)
      //     : allPostsQueryVars.skip,
      // first:
      //   first && typeof first === 'string'
      //     ? parseInt(first)
      //     : allPostsQueryVars.first,
    },
  })

  const initialApolloState = apolloClient.cache.extract()


  return {
    props: {
      initialApolloState,
    },
  }
}

export default TopicsPage
