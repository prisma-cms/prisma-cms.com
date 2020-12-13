import React, { useMemo } from 'react'
import { TagViewProps } from './interfaces'
import { TagViewStyled } from './styles'
import Link from 'next/link'
import Typography from 'material-ui/Typography'
import {
  TopicsConnectionTopicFragment,
  useTopicsConnectionQuery,
} from 'src/modules/gql/generated'
import { getTopicsVariables } from 'src/pages/Topics'
import { TopicsView } from 'src/pages/Topics/View'
import { NextRouter, useRouter } from 'next/router'
import { NextPageContextCustom } from 'src/pages/_App/interfaces'

export const getTagTopicsVariables = (
  router: NextRouter | NextPageContextCustom,
  tagId: string
) => {
  if (!tagId) {
    return
  }

  return {
    ...getTopicsVariables(router, {
      Tags_some: {
        Tag: {
          id: tagId,
        },
      },
    }),
  }
}

const TagView: React.FC<TagViewProps> = (props) => {
  const tag = props.object

  const router = useRouter()

  const variables = useMemo(() => {
    return getTagTopicsVariables(router, tag?.id || '')
  }, [tag?.id, router])

  /**
   * Получаем топики в блоге
   */
  const response = useTopicsConnectionQuery({
    skip: !tag?.id,
    variables,
  })

  const { loading } = response

  const objects = useMemo(() => {
    const objects: TopicsConnectionTopicFragment[] = []

    return (
      response.data?.objectsConnection.edges.reduce((curr, next) => {
        if (next?.node) {
          curr.push(next.node)
        }

        return curr
      }, objects) ?? []
    )
  }, [response.data?.objectsConnection.edges])

  if (!tag) {
    return null
  }

  return (
    <TagViewStyled>
      <Typography variant="title">{tag.name}</Typography>

      <TopicsView
        title={`Топики с тегом "${tag.name}"`}
        loading={loading}
        objects={objects}
        count={response.data?.objectsConnection.aggregate.count}
        variables={response.variables}
      />

      <Link href="/tags">
        <a className="tag--all-tags-link">Все теги</a>
      </Link>
    </TagViewStyled>
  )
}

export default TagView
