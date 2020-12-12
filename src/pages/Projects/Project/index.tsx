import Head from 'next/head'
import React, { useMemo } from 'react'
import {
  useProjectQuery,
  ProjectDocument,
  ProjectQuery,
  ResourceQueryVariables,
} from 'src/modules/gql/generated'

import View from './View'

import { Page, NextPageContextCustom } from '../../_App/interfaces'
import { useRouter, NextRouter } from 'next/router'

const getProjectVariables = (router: NextRouter | NextPageContextCustom) => {
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

const ProjectPage: Page = () => {
  const router = useRouter()

  const variables = useMemo(() => {
    return getProjectVariables(router)
  }, [router])

  const response = useProjectQuery({
    variables,
    onError: console.error,
  })
  return (
    <>
      <Head>
        <title>{response.data?.object?.name}</title>
        <meta
          name="description"
          content={`Проект "${response.data?.object?.name}"`}
        />
      </Head>

      <View object={response.data?.object?.Project} />
    </>
  )
}

ProjectPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  // TODO Fix private rooms access
  const result = await apolloClient.query<ProjectQuery>({
    query: ProjectDocument,

    /**
     * Важно, чтобы все переменные запроса серверные и фронтовые совпадали,
     * иначе при рендеринге не будут получены данные из кеша и рендер будет пустой.
     */
    variables: getProjectVariables(context),
  })
  return {
    statusCode: !result.data.object ? 404 : undefined,
  }
}

export default ProjectPage
