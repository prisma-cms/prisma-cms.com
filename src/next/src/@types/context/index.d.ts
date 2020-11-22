import '@prisma-cms/context'
import URI from 'urijs'
import Editor from '@prisma-cms/editor'
import { NextRouter } from 'next/dist/client/router'
import { ApolloClientNormolized } from 'src/pages/_App/interfaces'
import { muiTheme } from 'src/pages/_App/MUI/theme'
import Pagination from '../../components/Pagination'

declare module '@prisma-cms/context' {
  export type PrismaCmsContext = {
    uri: URI

    client: ApolloClientNormolized

    // TODO: убрать из контекста
    router: NextRouter

    // TODO: убрать из контекста
    /**
     * GraphQL-запросы
     */
    query?: any | null

    user?: Maybe<MeUserFragment>

    logout: () => void

    openLoginForm: () => void

    lang: string

    theme: typeof muiTheme

    localStorage: typeof global.localStorage | undefined

    /**
     * Сброс кеша аполло-клиента.
     * Делаем пока через такой хак, потому что в текущем компоненте apollo-cms
     * используется старый аполло-клиент
     */
    apiClientResetStore: () => Promise<void | ApolloQueryResult<any>[] | null>

    /**
     * @prisma-cms/front-editor
     */

    Pagination: any

    UserLink: any

    Editor: any
  }
}
