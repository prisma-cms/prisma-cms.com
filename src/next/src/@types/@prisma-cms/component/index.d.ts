declare module '@prisma-cms/component' {
  import { PrismaCmsContext } from 'src/pages/_App/interfaces'
  import React from 'react'

  export interface PrismaCmsComponentProps {}

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

    context!: PrismaCmsContext

    lexicon(word: string, options?: any): any

    mutate(arg0: any): any

    renderField(arg0: any): React.Element | null

    getFilters(): any

    addError(arg0: string | Error): void

    render(arg0?: any): React.Element | null
  }
}
