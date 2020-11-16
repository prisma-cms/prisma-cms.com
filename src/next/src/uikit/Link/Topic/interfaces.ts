import { Maybe } from 'src/modules/gql/generated'

export interface TopicLinkProps {
  object?: {
    __typename?: 'Resource'
    id: string
    name: string
    longtitle?: Maybe<string>
    uri: string
  }
}
