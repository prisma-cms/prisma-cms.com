import Head from 'next/head'
import React from 'react'

import ForumView from 'src/components/view/forum/view'

const TopicsPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Публикации</title>
        <meta name="description" content="Все публикации" />
      </Head>

      <ForumView />
    </>
  )
}

export default TopicsPage
