import { TypographyProps } from 'material-ui/Typography'
import { UiLinkProps } from '../interfaces'

export interface TagLinkProps {
  object: {
    __typename?: 'Tag'
    id: string
    name?: string
    longtitle?: string
    uri?: string
  }

  classes?: {
    root: string
    text: string
  }

  color?: TypographyProps['color']

  className?: UiLinkProps['className']

  textClassName?: UiLinkProps['textClassName']
}
