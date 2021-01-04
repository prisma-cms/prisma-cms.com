/**
 * Blog and Resource resources have same url mask like "/blog/..."
 * so we need load resource and switch like type
 */

import React, { useMemo } from 'react'
import {
  useResourceQuery,
  ResourceQueryVariables,
  ResourceType,
  ResourceDocument,
  ResourceQuery,
} from 'src/modules/gql/generated'

// import View from './View'

import { Page, NextPageContextCustom } from '../_App/interfaces'
// import { ResourcePageProps } from './interfaces'
// import { NextSeo } from 'next-seo'
import { useRouter, NextRouter } from 'next/router'

import { TopicPage } from '../Topics/Topic'

import { blogGetInitialProps, BlogPage } from '../Blogs/Blog'

export const getResourceVariables = (
  router: NextRouter | NextPageContextCustom
) => {
  const uri = new URL(
    router.asPath || '',
    global.location?.origin || 'http://localhost'
  )

  const variables: ResourceQueryVariables = {
    where: {
      uri: uri.pathname,
    },
  }

  return variables
}

const ResourcePage: Page = (props) => {
  const router = useRouter()

  const variables = useMemo(() => getResourceVariables(router), [router])

  const response = useResourceQuery({
    variables,
    // onCompleted: (data) => {
    //   // setResponse(data.object)
    // },
    onError: console.error,
  })

  const object = response.data?.object

  // const name = object?.name
  // const longtitle = object?.longtitle
  //   return <>
  //     <NextSeo title={name} description={longtitle || name} />

  // ResourcePage

  //     <div>
  //       ID: {object?.id}
  //     </div>

  //     <div>
  //       Type: {object?.type}
  //     </div>
  //   </>;

  if (!object) {
    return null
  }

  switch (object?.type) {
    case ResourceType.TOPIC:
      return <TopicPage {...props} />

    case ResourceType.BLOG:
    case ResourceType.PERSONALBLOG:
      return <BlogPage {...props} />

    default:
      throw new Error('Unknown Resource type')
  }
}

ResourcePage.getInitialProps = async (context) => {
  const { apolloClient } = context

  const queryResult = await apolloClient.query<ResourceQuery>({
    query: ResourceDocument,

    /**
     * Важно, чтобы все переменные запроса серверные и фронтовые совпадали,
     * иначе при рендеринге не будут получены данные из кеша и рендер будет пустой.
     */
    variables: getResourceVariables(context),
  })

  const object = queryResult.data.object

  switch (object?.type) {
    // case ResourceType.TOPIC:

    //   return <TopicPage
    //     {...props}
    //   />

    case ResourceType.BLOG:
    case ResourceType.PERSONALBLOG:
      //   return <BlogPage
      //     {...props}
      //   />

      await blogGetInitialProps(context, object)

      break

    // default: throw new Error("Unknown Resource type")
  }

  return {
    queryResult,
    statusCode: !object ? 404 : undefined,
  }
}

export default ResourcePage