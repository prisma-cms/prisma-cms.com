import Head from 'next/head'
import React, { useMemo } from 'react'
import {
  useResourceQuery,
  Resource_Fragment,
  TopicsConnectionQuery,
  TopicsConnectionDocument,
} from 'src/modules/gql/generated'

import View, { getBlogTopicsVariables } from './View'

import { NextPageContextCustom, Page } from '../../_App/interfaces'
import { useRouter } from 'next/router'

import { getResourceVariables } from 'src/pages/Resource'

export const BlogPage: Page = () => {
  const router = useRouter()
  const queryVariables = useMemo(() => {
    return {
      ...getResourceVariables(router),
    }
  }, [router])

  const response = useResourceQuery({
    variables: queryVariables,
    onError: console.error,
  })

  const blog = response.data?.object

  if (!blog) {
    return null
  }

  return (
    <>
      <Head>
        <title>Блог "{blog?.name}"</title>
        <meta
          name="description"
          content={`Все топики в блоге "${blog.name}"`}
        />
      </Head>

      <View object={blog} />
    </>
  )
}

export const blogGetInitialProps = async (
  context: NextPageContextCustom,
  resource: Resource_Fragment
) => {
  const { apolloClient } = context

  await apolloClient.query<TopicsConnectionQuery>({
    query: TopicsConnectionDocument,

    /**
     * Важно, чтобы все переменные запроса серверные и фронтовые совпадали,
     * иначе при рендеринге не будут получены данные из кеша и рендер будет пустой.
     */
    variables: getBlogTopicsVariables(context, resource.id),
  })

  return {}
}

// export default BlogPage
