import { Resource_Fragment } from 'src/modules/gql/generated'

export interface TopicCommentsProps {
  topic: Resource_Fragment
}

export interface TopicCommentsState {
  // commentData: Record<string, any>
  newCommentKey: string
}
