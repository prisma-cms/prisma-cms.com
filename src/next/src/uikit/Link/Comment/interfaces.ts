import { Resource } from 'src/modules/gql/generated'

export interface UikitCommentLinkObjectResource {
  __typename?: 'Resource'
  id?: Resource['id']
  uri?: Resource['uri']
  createdAt?: Resource['createdAt']
  name?: Resource['name']
}

export interface UikitCommentLinkObject extends UikitCommentLinkObjectResource {
  CommentTarget?: UikitCommentLinkObjectResource & {
    __typename?: 'Resource'
  }
}

export interface UikitCommentLinkProps {
  // object: Resource & {
  //   type: ResourceType.COMMENT;
  // }

  object: UikitCommentLinkObject | null | undefined

  // object: Resource & {
  //   __typename?: 'Resource'
  //   type: "Comment"
  //   // id: string
  //   name?: string
  //   uri: string | null | undefined
  //   // CommentTarget: Partial<Comment> & {
  //   //   __typename?: 'Resource'
  //   //   type: "Topic"
  //   // }
  // }

  className?: string

  linkType?: 'comment' | 'target'
}
