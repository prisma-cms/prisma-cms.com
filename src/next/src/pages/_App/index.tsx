import React, { useCallback, useEffect, useMemo, useState } from 'react'
import NextApp, { AppContext } from 'next/app'
import { useRouter } from 'next/router'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'styled-components'
import theme from 'src/theme'
import {
  NextPageContextCustom,
  MainApp,
  PrismaCmsContext,
  AppInitialProps,
  PageProps,
} from './interfaces'

import {
  useApollo,
  initializeApollo,
  getSubscriptionClient,
} from 'src/lib/apolloClient'

import Context from '@prisma-cms/context'
import URI from 'urijs'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { muiTheme } from './MUI/theme'

import Auth from 'src/components/Auth'
import WithUser from './WithUser'
import { AuthFormResponse } from '../../components/Auth/forms/interfaces'

import moment from 'moment'
import Page404 from '../_Error/404'
import ErrorPage from '../_Error'
import { NextSeo, NextSeoProps } from 'next-seo'

// TODO: Проработать локализацию
moment.locale('ru')

const App: MainApp = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState)

  const { statusCode } = pageProps

  const router = useRouter()

  useEffect(() => {
    if (global.document) {
      const muiSsrStyles = global.document.querySelector('#server-side-jss')

      if (muiSsrStyles) {
        muiSsrStyles.remove()
      }
    }
  }, [])

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

  const content = useMemo(() => {
    const meta: NextSeoProps = {}

    let content = null

    /**
     * Если получили серверную ошибку, выводим страницу ошибки
     */
    if (statusCode && statusCode !== 200) {
      switch (statusCode) {
        case 404:
          meta.noindex = true
          meta.nofollow = true

          content = <Page404 />

          break

        default:
          content = <ErrorPage statusCode={statusCode} />
      }
    } else {
      content = <Component {...pageProps} />
    }

    return (
      <>
        <NextSeo {...meta} />
        {content}
      </>
    )
  }, [statusCode, pageProps])

  return (
    <>
      <MuiThemeProvider
        theme={muiTheme}
        // For SSR only
        sheetsManager={
          typeof global.window === 'undefined' ? new Map() : undefined
        }
      >
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
                <div id="content">{content}</div>
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

  const { pageProps, ...otherProps } = await NextApp.getInitialProps(
    newAppContext
  )

  const { statusCode } = pageProps as PageProps

  /**
   * Если выполняется на серверной стороне
   */
  if (statusCode && newAppContext.ctx.res) {
    newAppContext.ctx.res.statusCode = statusCode
  }

  const newProps: AppInitialProps = {
    ...otherProps,
    pageProps: {
      ...pageProps,
      statusCode,
      initialApolloState: apolloClient.cache.extract(),
    },
  }

  return newProps
}

export default App
