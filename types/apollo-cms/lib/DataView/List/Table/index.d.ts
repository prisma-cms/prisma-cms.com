declare module 'apollo-cms/lib/DataView/List/Table' {
  import PrismaCmsComponent, {
    PrismaCmsComponentProps,
    PrismaCmsComponentState,
  } from '@prisma-cms/component'
  import { Exact, Maybe } from 'src/modules/gql/generated'

  export type Column<P> = {
    /**
     * Любое из полей полученного из запроса объекта
     */
    id: keyof P

    key?: string

    /**
     * Заголовок колонки
     */
    label?: string

    className?: string

    renderer?(value: any, record: P): any

    hidden?: boolean
  }

  export type ColumnConfig<P = {}> = Column<P>

  export interface TableViewProps extends PrismaCmsComponentProps {
    columnData?: ColumnConfig[]

    page: number

    withPagination?: boolean

    data:
      | {
          objectsConnection: any
        }
      | null
      | undefined

    variables?: Exact<{
      first?: Maybe<number>
    }>
  }

  export interface TableViewState extends PrismaCmsComponentState {}

  export class TableView<
    P extends TableViewProps = TableViewProps,
    S extends TableViewState = TableViewState
  > extends PrismaCmsComponent<P, S> {
    static defaultProps = {
      columnData: [],
    }

    mutate(arg0: any): void
  }

  export const styles: any = {}
}
