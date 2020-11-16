import { EditableObjectProps } from 'apollo-cms/dist/DataView/Object/Editable'
import { Resource, User } from 'src/modules/gql/generated'
import {
  UikitCommentLinkObject,
  UikitCommentLinkProps,
} from 'src/uikit/Link/Comment/interfaces'

export interface UikitCommentObjectUser {
  __typename?: User['__typename']
  id?: User['id']
}

export interface UikitCommentObject extends UikitCommentLinkObject {
  content?: Resource['content']

  CreatedBy?: UikitCommentObjectUser
}

export interface UikitCommentProps extends EditableObjectProps {
  object: UikitCommentObject | null | undefined

  linkType?: UikitCommentLinkProps['linkType']

  className?: string
}
