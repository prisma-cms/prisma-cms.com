import React from 'react'
import NextApp, { AppContext, AppInitialProps } from 'next/app'
// import { ApolloProvider } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'styled-components'
import theme, { GlobalStyle } from './theme'
import { NextPageContextCustom, AppProps } from './interfaces'

import { useApollo, initializeApollo } from 'src/next/src/lib/apolloClient'

import Context from '@prisma-cms/context'
import URI from 'urijs'

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <Context.Provider
            value={{
              uri: new URI(),
              client: apolloClient,
            }}
          >
            <nav></nav>
            <main id="content">
              <Component {...pageProps} />
            </main>
          </Context.Provider>
        </ApolloProvider>
      </ThemeProvider>
    </>
  )
}

App.getInitialProps = async (appContext: AppContext) => {
  /**
   * Для того, чтобы в итоге можно было собрать общий аполло-стейт
   * с приложения и далее выполняемый страниц и документа,
   * передаем аполло-клиент далее в контекст приложения.
   */
  const apolloClient = initializeApollo()

  /**
   * Передаваемый далее в страницу контекст
   */
  const newAppContext = {
    ...appContext,
    ctx: {
      ...appContext.ctx,
      apolloClient,
    } as NextPageContextCustom,
  }

  /**
   * Здесь вызывается page.getInitialProps() и далее _document.getInitialProps()
   * Все собирается в конечный appProps
   */
  const appProps = await NextApp.getInitialProps(newAppContext)

  const { pageProps, ...otherProps } = appProps

  const newProps: AppInitialProps = {
    ...otherProps,
    pageProps: {
      ...pageProps,
      initialApolloState: apolloClient.cache.extract(),
    },
  }

  return newProps
}
