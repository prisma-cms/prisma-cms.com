import {
  ResourceOrderByInput,
  ResourceWhereInput,
  TopicCreateInput,
} from 'src/modules/gql/generated'

export type BlogAutocompleteProps = {
  value: string

  where: ResourceWhereInput

  orderBy: ResourceOrderByInput

  updateObject: (data: Partial<TopicCreateInput>) => void

  // setFilters?: Function
  // getFilters?: Function
}
