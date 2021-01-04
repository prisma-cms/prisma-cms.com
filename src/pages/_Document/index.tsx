import React from 'react'
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'

import { ServerStyleSheet } from 'styled-components'

import { JssProvider } from 'react-jss'

// import {
//   // sheetsRegistry,
//   generateClassName,
// } from 'src/pages/_App/MUI/theme'

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { createGenerateClassName } from 'material-ui/styles'
// import { muiTheme } from '../_App/MUI/theme'

import { SheetsRegistry } from 'react-jss'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ru">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <base href="/" />
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700&subset=latin,cyrillic"
            rel="stylesheet"
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `(function (d, w, c) {
                (w[c] = w[c] || []).push(function () {
                  try {
                    w.yaCounter53203621 = new Ya.Metrika({
                      id: 53203621,
                      clickmap: true,
                      trackLinks: true,
                      accurateTrackBounce: true
                    });
                  } catch (e) { }
                });
  
                    var n = d.getElementsByTagName("script")[0],
                        s = d.createElement("script"),
                        f = function () {n.parentNode.insertBefore(s, n); };
                    s.type = "text/javascript";
                    s.async = true;
                    s.src = "https://mc.yandex.ru/metrika/watch.js";
  
                    if (w.opera == "[object Opera]") {
                d.addEventListener("DOMContentLoaded", f, false);
                    } else {f(); }
                })(document, window, "yandex_metrika_callbacks");`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }

  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()

    const sheetsRegistry = new SheetsRegistry()

    const originalRenderPage = ctx.renderPage

    const generateClassName = createGenerateClassName()

    /**
     * Здесь выполняется конечный рендеринг всего приложения,
     * в результате чего мы получем { html, head, styles }
     */
    try {
      ctx.renderPage = () => {
        const renderPageResult = originalRenderPage({
          // enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
          // enhanceComponent: (Component) => (props) => {
          enhanceApp: (App) => (props) => {
            return (
              <>
                {/* 2_Document:enhanceApp */}
                {sheet.collectStyles(
                  <JssProvider
                    registry={sheetsRegistry}
                    generateClassName={generateClassName}
                  >
                    {/* <MuiThemeProvider theme={muiTheme} sheetsManager={new Map()}> */}
                    <App {...props} />
                    {/* </MuiThemeProvider> */}
                  </JssProvider>
                )}
                {/* 2_Document:enhancApp */}
              </>
            )
          },
        })

        return renderPageResult
      }

      const initialProps = await Document.getInitialProps(ctx)

      const css = sheetsRegistry.toString()

      const result = {
        ...initialProps,

        // Styles fragment is rendered after the app and page rendering finish.
        styles: [
          ...React.Children.toArray(initialProps.styles),
          sheet.getStyleElement(),
          <style
            key="styles"
            id="server-side-jss"
            dangerouslySetInnerHTML={{
              __html: css,
            }}
          />,
        ],
      }

      return result
    } finally {
      sheet.seal()
    }
  }
}
