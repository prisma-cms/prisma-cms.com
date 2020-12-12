export type PaginationProps = {
  pagevariable?: string

  page: number

  limit: number | null | undefined

  total: number

  rowProps?: any

  style?: any

  classes?: any
}

// export type PaginationWithStylesProps = PaginationProps & {
//   classes: any
// }
