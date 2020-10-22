/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '@prisma-cms/context'
declare module '@prisma-cms/filters'

declare module 'apollo-cms/lib/DataView/List/Table' {
  
  import React from 'react'
  import { Exact, Maybe } from 'src/modules/gql/generated';


  export type Column<P> = {
    /**
     * Любое из полей полученного из запроса объекта
     */
    id: keyof P

    key?: string;

    /**
     * Заголовок колонки
     */
    label?: string

    className?: string

    renderer? (value: any, record: P): any
  }

  export type ColumnConfig<P = {}> = Column<P>


  export interface TableViewProps {

    columnData?: ColumnConfig[];

    page: number;
    
    withPagination?: boolean;
    
    data: Maybe<{
      objectsConnection: any;
    }>;

    variables?: Exact<{
      first?: Maybe<number>;
    }>;

  }

  export interface TableViewState {

  }

  export class TableView<P extends TableViewProps = TableViewProps, S extends TableViewState = TableViewState> extends React.PureComponent<P, S> {

    static defaultProps = {
      columnData: [],
    }

    // getColumns<P>(): ColumnConfig<P>[];
  }

  export const styles: any = {};
}

/**
 * Не стоит тащить сразу все компоненты из @prisma-cms/front/lib/modules/ui,
 * слишком много весят
 */
// declare module '@prisma-cms/front/lib/modules/ui'
declare module '@prisma-cms/front/lib/modules/ui/Input/Phone'
declare module 'react-jss/lib/JssProvider'

declare module '@prisma-cms/component' {
  import { PrismaCmsContext } from 'src/next/src/pages/_App/interfaces'
  import React from 'react'

  export interface PrismaCmsComponentProps { }

  export interface PrismaCmsComponentState {
    inRequest: boolean

    errors: any[]

    locales: any
  }

  export default class PrismaCmsComponent<
    P extends PrismaCmsComponentProps = PrismaCmsComponentProps,
    S extends PrismaCmsComponentState = PrismaCmsComponentState
    > extends React.PureComponent<P, S> {
    static propTypes: any

    static defaultProps: any

    declare context: PrismaCmsContext

    lexicon(word: string, options?: any): any

    mutate(arg0: any): any

    renderField(arg0: any): React.Element | null

    getFilters(): any

    addError(arg0: string | Error): void

    render(arg0: any): React.Element | null
  }
}
