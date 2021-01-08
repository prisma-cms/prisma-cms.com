import { NextSeo } from 'next-seo'
import React, { useMemo } from 'react'
import { uid } from 'uid'
import { initEditorObject } from 'src/components/Root'
import {
  TopicCreateInput,
  useCreateTopicProcessorMutation,
  useUpdateTopicProcessorMutation,
} from 'src/modules/gql/generated'
import TopicView from 'src/pages/Topics/Topic/View'
import { CodeChallengeDiscussProps } from './interfacse'

/**
 * Обсуждение учебного задания
 */
const CodeChallengeDiscuss: React.FC<CodeChallengeDiscussProps> = (props) => {
  const { challenge, topicId } = props

  const { name, Topic } = challenge

  const title = Topic?.name || `Обсуждение задания "${name}"`

  const [createTopicMutation] = useCreateTopicProcessorMutation({
    // onCompleted: onSave,
  })

  const [updateTopicMutation] = useUpdateTopicProcessorMutation({
    // onCompleted: onSave,
  })

  return useMemo(() => {
    let topic: JSX.Element | undefined

    if (Topic) {
      topic = (
        <TopicView
          object={Topic}
          mutate={updateTopicMutation}
          canChangeBlog={false}
        />
      )
    } else {
      const newTopicId = uid(25)

      const defaultObject = initEditorObject({
        name: 'ContentEditor',
        component: 'ContentEditor',
        components: [],
        props: {},
      })

      const _dirty: TopicCreateInput = {
        id: newTopicId,
        name: title,
        components: [defaultObject],
        CodeChallenge: {
          connect: {
            id: challenge.id,
          },
        },
        blogID: 'ckjomjn4hh0190730mlgo3st3',
        uri: `/learn/exercises/${challenge.id}/discuss/${newTopicId}`,
      }

      topic = (
        <TopicView
          object={undefined}
          _dirty={_dirty}
          cacheKey="new_code_challenge_topic"
          mutate={createTopicMutation}
          canChangeBlog={false}
        />
      )
    }

    return (
      <>
        <NextSeo title={title} noindex={!topicId} />

        {topic}
      </>
    )
  }, [
    Topic,
    title,
    topicId,
    updateTopicMutation,
    challenge.id,
    createTopicMutation,
  ])
}

export default CodeChallengeDiscuss
