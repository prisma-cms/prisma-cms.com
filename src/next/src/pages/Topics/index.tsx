import Head from 'next/head'
import React from 'react'
import { useTopicsConnectionQuery } from 'src/modules/gql/generated'

import ForumView from 'src/components/view/forum/view'

const TopicsPage: React.FC = () => {
  const queryResult = useTopicsConnectionQuery()

  return (
    <>
      <Head>
        <title>Публикации</title>
        <meta name="description" content="Все публикации" />
      </Head>
      Публикации
      {queryResult.data ? <ForumView {...queryResult} /> : null}
    </>
  )
}

export default TopicsPage
