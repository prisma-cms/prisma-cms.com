import { PrismaCmsComponentProps } from '@prisma-cms/component/dist'
import { Resource_Fragment } from 'src/modules/gql/generated'

export interface TopicBlogProps extends PrismaCmsComponentProps {
  Topic: Resource_Fragment | null | undefined

  updateObject: (data: any) => void

  inEditMode: boolean
}
