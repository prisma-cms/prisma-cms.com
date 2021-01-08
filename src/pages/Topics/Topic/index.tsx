import React, { useMemo } from 'react'
import {
  useResourceQuery,
  useUpdateTopicProcessorMutation,
} from 'src/modules/gql/generated'

import { getResourceVariables } from 'src/pages/Resource'

import View from './View'

import { Page } from '../../_App/interfaces'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

export const TopicPage: Page = () => {
  const router = useRouter()

  const [mutate] = useUpdateTopicProcessorMutation()

  const variables = useMemo(() => getResourceVariables(router), [router])

  const queryResult = useResourceQuery({
    variables,
    skip: !variables.where,
    onError: console.error,
  })

  const object = queryResult.data?.object
  const name = object?.name
  const longtitle = object?.longtitle

  return (
    <>
      <NextSeo
        title={name}
        description={`Публикакация "${longtitle || name}"`}
      />

      {object ? (
        <View object={object} mutate={mutate} canChangeBlog={false} />
      ) : null}
    </>
  )
}

/**
 * @deprecated
 * Do not use TopicPage directly. Use ResourcePage instead
 */
// export default TopicPage
