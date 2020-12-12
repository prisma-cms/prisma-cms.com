import React, { useMemo } from 'react'
import { BlogViewProps } from './interfaces'
import { BlogViewStyled } from './styles'
// import Link from 'next/link'
import Typography from 'material-ui/Typography'
import {
  TopicsConnectionTopicFragment,
  useTopicsConnectionQuery,
} from 'src/modules/gql/generated'
import { getTopicsVariables } from 'src/pages/Topics'
import { TopicsView } from 'src/pages/Topics/View'
import { NextRouter, useRouter } from 'next/router'
import { NextPageContextCustom } from 'src/pages/_App/interfaces'

export const getBlogTopicsVariables = (
  router: NextRouter | NextPageContextCustom,
  blogId: string
) => {
  if (!blogId) {
    return
  }

  return {
    ...getTopicsVariables(router, {
      Blog: {
        id: blogId,
      },
    }),
  }
}

const BlogView: React.FC<BlogViewProps> = (props) => {
  const blog = props.object

  const router = useRouter()

  const variables = useMemo(() => {
    return getBlogTopicsVariables(router, blog?.id || '')
  }, [blog?.id, router])

  // console.log('BlogView variables', variables);
  // console.log('BlogView page', page);

  /**
   * Получаем топики в блоге
   */
  const response = useTopicsConnectionQuery({
    skip: !blog?.id,
    variables,
    // variables: {
    //   where: {
    //     type: ResourceType.TOPIC,
    //     Blog: {
    //       id: blog.id,
    //     },
    //   },
    // },
  })

  // console.log('BlogView response', response);

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

  if (!blog) {
    return null
  }

  return (
    <BlogViewStyled>
      <Typography variant="title">{blog.name}</Typography>

      <TopicsView
        title={`Топики в блоге ${blog.name}`}
        loading={loading}
        objects={objects}
        count={response.data?.objectsConnection.aggregate.count}
        variables={response.variables}
      />
    </BlogViewStyled>
  )
}

export default BlogView
