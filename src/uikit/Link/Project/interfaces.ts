import { Maybe } from 'src/modules/gql/generated'

export interface ProjectLinkProps {
  object?: Maybe<{
    __typename?: 'Project'
    id: string
    name?: string
    Resource?: Maybe<{
      __typename?: 'Resource'
      id: string
      uri: string
    }>
  }>
}
