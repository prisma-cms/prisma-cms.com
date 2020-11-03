import React, { useCallback, useEffect, useMemo, useState } from 'react'
import NextApp, { AppContext, AppInitialProps } from 'next/app'
import { useRouter } from 'next/router'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'styled-components'
import theme, { GlobalStyle } from './theme'
import { NextPageContextCustom, AppProps, PrismaCmsContext } from './interfaces'

import {
  useApollo,
  initializeApollo,
  getSubscriptionClient,
} from 'src/next/src/lib/apolloClient'

import Context from '@prisma-cms/context'
import URI from 'urijs'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { muiTheme } from './MUI/theme'

import Auth from 'src/next/src/components/Auth'
import WithUser from './WithUser'
import { AuthFormResponse } from '../../components/Auth/forms/interfaces'

import moment from 'moment'
import Head from 'next/head'

// TODO: Проработать локализацию
moment.locale('ru')

const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState)

  // const {
  //   sheetsRegistry,
  //   generateClassName,
  // } = pageProps;

  const router = useRouter()

  useEffect(() => {
    if (global.document) {
      const muiSsrStyles = global.document.querySelector('#server-side-jss')

      if (muiSsrStyles) {
        muiSsrStyles.remove()
      }
    }
  }, [])

  // useEffect(() => {

  //   router.prefetch = async (url) => {
  //     // eslint-disable-next-line no-console
  //     console.log('router.prefetch', url)
  //   }

  //   const handleRouteChange = (url: string) => {
  //     // eslint-disable-next-line no-console
  //     console.log('App is changing to: ', url)
  //   }

  //   router.events.on('routeChangeStart', handleRouteChange)

  //   // If the component is unmounted, unsubscribe
  //   // from the event with the `off` method:
  //   return () => {
  //     router.events.off('routeChangeStart', handleRouteChange)
  //   }
  // }, [])

  // console.log('Render App');

  const [authOpen, setOpened] = useState(false)

  /**
   * Сбрасываем кеш аполло-клиента на авторизацию и деавторизацию
   */
  const resetConnection = useCallback(
    async (token: string | null) => {
      if (token) {
        global.localStorage.setItem('token', token)
      } else {
        global.localStorage.removeItem('token')
      }

      /**
       * Переподключаем веб-сокет
       */
      const subscriptionClient = getSubscriptionClient()

      subscriptionClient?.close(false, false)

      await apolloClient.resetStore()
    },
    [apolloClient]
  )

  const loginComplete = useCallback(
    async (data: AuthFormResponse) => {
      const { token } = data
      await resetConnection(token)
    },
    [resetConnection]
  )

  const loginCanceled = useCallback(() => {
    setOpened(false)
  }, [setOpened])

  const logout = useCallback(async () => {
    await resetConnection(null)
  }, [resetConnection])

  /**
   * Открываем форму для авторизации
   */
  const openLoginForm = useCallback(() => {
    setOpened(true)
  }, [setOpened])

  const contextValue = useMemo(() => {
    const context: PrismaCmsContext = {
      uri: new URI(),
      client: apolloClient,
      router,
      logout,
      openLoginForm,
      lang: 'ru',
      theme: muiTheme,
    }

    return context
  }, [apolloClient, logout, openLoginForm, router])

  /**
   * Отлавливаем изменения в контексте
   */
  // const compare__context = useMemo(() => {

  //   console.log('compare__context useMemo');

  //   let target = contextValue;

  //   return (a: typeof contextValue) => {

  //     console.log('compare__context a', a);

  //     if (!compare("compare__context", a, target)) {
  //       target = a;
  //     }
  //   }

  // }, [contextValue]);

  // compare__context(contextValue);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <base href="/" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700&subset=latin,cyrillic"
          rel="stylesheet"
        />
      </Head>
      <MuiThemeProvider
        theme={muiTheme}
        // For SSR only
        sheetsManager={
          typeof global.window === 'undefined' ? new Map() : undefined
        }
      >
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <ApolloProvider client={apolloClient}>
            <Context.Provider value={contextValue}>
              <WithUser context={contextValue}>
                <Auth
                  open={authOpen}
                  useMetamask={true}
                  loginComplete={loginComplete}
                  loginCanceled={loginCanceled}
                  showRegForm={true}
                />

                <div id="content">
                  <Component {...pageProps} />
                </div>
              </WithUser>
            </Context.Provider>
          </ApolloProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </>
  )
}

App.getInitialProps = async (appContext: AppContext) => {
  /**
   * В родном контексте неправильная типизация
   */
  // const req = appContext.ctx.req as Request;

  // const lang = req.acceptsLanguages('ru', 'en');

  // if (lang) {
  //   moment.locale(lang);
  // }

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

export default App
