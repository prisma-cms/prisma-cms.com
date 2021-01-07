import React, { useCallback, useMemo } from 'react'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import { Page } from 'src/pages/_App/interfaces'
import { initEditorObject } from 'src/components/Root'
import {
  CreateTopicProcessorMutation,
  useCreateTopicProcessorMutation,
} from 'src/modules/gql/generated'
import { useRouter } from 'next/router'

const TopicView = dynamic(import('../View'), { ssr: false })

const CreatTopicPage: Page = () => {
  const defaultObject = useMemo(
    () =>
      initEditorObject({
        name: 'ContentEditor',
        component: 'ContentEditor',
        components: [],
        props: {},
      }),
    []
  )

  const router = useRouter()

  /**
   * При успешном выполнении перекидываем на созданную страницу
   */
  const onSave = useCallback(
    (data: CreateTopicProcessorMutation) => {
      const uri = data.response.data?.uri

      if (uri) {
        router.push(uri)
      }
    },
    [router]
  )

  const [mutate] = useCreateTopicProcessorMutation({
    onCompleted: onSave,
  })

  return useMemo(
    () => (
      <>
        <NextSeo
          title="Новая публикация"
          description="Создать новость или вопрос"
          noindex
          nofollow
        />

        <TopicView
          object={undefined}
          _dirty={{
            components: [defaultObject],
          }}
          cacheKey="new_topic"
          mutate={mutate}
        />
      </>
    ),
    [defaultObject, mutate]
  )
}

export default CreatTopicPage
