import { PrismaCmsComponentProps } from '@prisma-cms/component/dist'
import { TopicObjectFragment } from 'src/modules/gql/generated'

export interface TopicBlogProps extends PrismaCmsComponentProps {
  Topic: TopicObjectFragment | null | undefined

  updateObject: (data: any) => void

  inEditMode: boolean
}
