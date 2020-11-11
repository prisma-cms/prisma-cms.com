import { TableViewProps } from 'apollo-cms/dist/DataView/List/Table'

export interface ObjectsListViewProps extends TableViewProps {
  page?: number

  withPagination?: boolean

  count: number | undefined
}
