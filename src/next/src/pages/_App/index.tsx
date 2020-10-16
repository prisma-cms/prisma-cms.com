import React, { useEffect } from 'react'
import NextApp, { AppContext, AppInitialProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
// import styled, { ThemeProvider } from 'styled-components'
// import theme, { GlobalStyle } from './theme'
import { NextPageContextCustom, AppProps } from './interfaces'

import { useApollo, initializeApollo } from 'src/next/src/lib/apolloClient'

import Context from '@prisma-cms/context'
import URI from 'urijs'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { muiTheme } from './MUI/theme'

// import JssProvider from 'react-jss/lib/JssProvider'
// import { createGenerateClassName } from 'material-ui/styles'

// import Typography from 'material-ui/Typography'
// import Button from 'material-ui/Button';
// import Grid from 'material-ui/Grid'
// import Link from 'next/link';

// console.log(process.env);

// const ButtonMuiStyled = styled(Button)`
//    {
//     background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
//   }
// `


export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)


  // const {
  //   sheetsRegistry,
  //   generateClassName,
  // } = pageProps;

  useEffect(() => {
    if (document) {
      const muiSsrStyles = document.querySelector('#server-side-jss')

      if (muiSsrStyles) {
        muiSsrStyles.remove()
      }
    }
  })


  console.log('Render App');


  let content = (
    <>

      {/* <GlobalStyle /> */}

      {/* <ThemeProvider theme={theme}> */}

      <ApolloProvider client={apolloClient}>
        <Context.Provider
          value={{
            uri: new URI(),
            client: apolloClient,
          }}
        >
          {/* <nav
                style={{
                  padding: '0 8px',
                }}
              >
                <Grid
                  container
                  spacing={16}
                >
                  <Grid
                    item
                  >
                    <Link
                      href="/"
                    >
                      Main Page
                      </Link>
                  </Grid>
                  <Grid
                    item
                  >
                    <Link
                      href="/topics"
                    >
                      Topics
                      </Link>
                  </Grid>
                </Grid>
              </nav> */}
          {/* <main id="content"> */}

          {/* <Typography
                  color="error"
                  style={{
                    // display: !global.document ? 'none' : 'inline-block',
                    // color: !global.document ? 'green' : 'red',
                  }}
                >
                  MUI Typography
                  </Typography>

                <ButtonMuiStyled>
                  Button MUI Styled
                  </ButtonMuiStyled> */}

          <Component {...pageProps} />
          {/* </main> */}
        </Context.Provider>
      </ApolloProvider>

      {/* </ThemeProvider> */}
    </>
  )

  if (typeof window !== 'undefined') {

    content = <MuiThemeProvider
      theme={muiTheme}

      // For SSR only
      // sheetsManager={typeof window === 'undefined' ? new Map() : undefined}
      sheetsManager={new Map()}
    >
      {content}
    </MuiThemeProvider>
  }

  return content;
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
