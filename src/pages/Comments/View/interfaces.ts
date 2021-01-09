import { PaginationProps } from 'src/components/Pagination'
import { CommentsConnectionCommentFragment } from 'src/modules/gql/generated'

export type CommentsViewProps = {
  objects: CommentsConnectionCommentFragment[]
} & PaginationProps
