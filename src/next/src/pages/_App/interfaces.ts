import { NextComponentType, NextPageContext } from 'next'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import URI from 'urijs'
import { NextRouter } from 'next/router'
import { Maybe, MeUserFragment } from 'src/modules/gql/generated'
// import { ApolloClient } from 'apollo-client'
// import { NormalizedCacheObject } from 'apollo-cache-inmemory'

/**
 * Расширенный контекст страниц приложения
 */
export interface NextPageContextCustom extends NextPageContext {
  /**
   * Аполло-клиент, чтобы в страницах и документе можно было
   * получить его в getInitialProps и вызвать запросы.
   * Надо именно так, чтобы иметь на выходе общий стейт клиента.
   */
  apolloClient: ApolloClientNormolized
}

/**
 * Свойства для основного приложения
 */
export type AppProps = {
  Component: any
  pageProps: any
}

// TODO: обновить аполло-клиент
/**
 * API-клиент
 */
export type ApolloClientNormolized = ApolloClient<NormalizedCacheObject>

/**
 * Свойства, передаваемые в @prisma-cms/context
 */
export type PrismaCmsContext = {
  uri: ReturnType<typeof URI>

  client: ApolloClientNormolized

  // TODO: убрать из контекста
  router: NextRouter

  // TODO: убрать из контекста
  /**
   * GraphQL-запросы
   */
  query?: any

  user?: Maybe<MeUserFragment>

  logout: () => void

  openLoginForm: () => void

  lang: string
}

/**
 * Страница с кастомным контекстом
 */
export type Page<
  C extends NextPageContextCustom = NextPageContextCustom
  > = NextComponentType<C>
