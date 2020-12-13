import Head from 'next/head'
import React, { useMemo } from 'react'
import {
  useTagQuery,
  TagDocument,
  TagQuery,
  TopicsConnectionQuery,
  TopicsConnectionDocument,
} from 'src/modules/gql/generated'

import View, { getTagTopicsVariables } from './View'

import { Page, NextPageContextCustom } from '../../_App/interfaces'
import { useRouter, NextRouter } from 'next/router'

function getVariables(router: NextRouter | NextPageContextCustom) {
  const name = router.query.name

  if (!name || typeof name !== 'string') {
    return
  }

  return {
    where: {
      name,
    },
  }
}

const TagPage: Page = () => {
  const router = useRouter()

  const variables = useMemo(() => {
    return getVariables(router)
  }, [router])

  const response = useTagQuery({
    skip: !variables,
    variables: variables,
    onError: console.error,
  })

  // return "dsfdsf";
  /**
   * useState используем уже после выполнения запроса, так как на стороне setState не имеет эффекта,
   * надо дефолтные данные сразу задать из полученного результата
   */
  // const [response, setResponse] = useState<
  //   TagConnectionQuery | null | undefined
  // >(queryResult.data)

  // const objects = useMemo(() => {
  //   const objects: TagConnectionTagFragment[] = []

  //   return (
  //     response?.objectsConnection.edges.reduce((curr, next) => {
  //       if (next?.node) {
  //         curr.push(next.node)
  //       }

  //       return curr
  //     }, objects) ?? []
  //   )
  // }, [response?.objectsConnection.edges])

  // const { variables, loading } = queryResult

  const object = response.data?.object

  if (!object) {
    return null
  }

  return (
    <>
      <Head>
        <title>{object.name}</title>
        <meta
          name="description"
          content={`Все топики с тегом "${object.name}"`}
        />
      </Head>

      <View object={object} />
    </>
  )
}

TagPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  const variables = getVariables(context)

  const result = variables
    ? await apolloClient.query<TagQuery>({
        query: TagDocument,

        /**
         * Важно, чтобы все переменные запроса серверные и фронтовые совпадали,
         * иначе при рендеринге не будут получены данные из кеша и рендер будет пустой.
         */
        variables,
      })
    : null

  const tag = result?.data.object

  if (tag) {
    await apolloClient.query<TopicsConnectionQuery>({
      query: TopicsConnectionDocument,

      /**
       * Важно, чтобы все переменные запроса серверные и фронтовые совпадали,
       * иначе при рендеринге не будут получены данные из кеша и рендер будет пустой.
       */
      variables: getTagTopicsVariables(context, tag.id),
    })
  }

  return {
    statusCode: !tag ? 404 : undefined,
  }
}

export default TagPage
