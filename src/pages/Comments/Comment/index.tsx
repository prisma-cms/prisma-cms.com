import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { useResourceQuery } from 'src/modules/gql/generated'
import { getResourceVariables } from 'src/pages/Resource'
import { Page } from 'src/pages/_App/interfaces'
import Comment from 'src/uikit/Comments/Comment'

/**
 * Страница комментария
 */
const CommentPage: Page = () => {
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

  if (!object) {
    return null
  }

  return (
    <>
      <NextSeo
        title={object.name}
        description={`Комментарий к топику "${object.Topic?.name}"`}
      />

      <Comment object={object} />
    </>
  )
}

/**
 * Данные объекта берутся в src/pages/Resource,
 * поэтому не нужно дополнительно вызывать getInitialProps
 */

export default CommentPage
