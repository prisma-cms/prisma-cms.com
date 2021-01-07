import { Maybe } from 'src/modules/gql/generated'
import { UiLinkProps } from '../interfaces'

export interface BlogLinkProps {
  object: {
    __typename?: 'Resource'
    id: string
    uri: string
    name: string
    longtitle?: Maybe<string>
  }

  variant?: UiLinkProps['variant']

  classes?: {
    root: string
    text: string
  }

  target?: string
}
