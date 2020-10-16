import React from 'react';
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'

// import { ServerStyleSheet } from 'styled-components'

import JssProvider from 'react-jss/lib/JssProvider'

// import {
//   // sheetsRegistry,
//   generateClassName,
// } from 'src/next/src/pages/_App/MUI/theme'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { createGenerateClassName } from 'material-ui/styles'
import { muiTheme } from '../_App/MUI/theme';

const SheetsRegistry = require('react-jss').SheetsRegistry


export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ru">
        <Head>
          <link rel="icon" href="/demo/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }

  static async getInitialProps(ctx: DocumentContext) {
    // const sheet = new ServerStyleSheet()


    console.log('ctx.req?.url', ctx.req?.url);

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
          // enhanceComponent: (Component) => (props) => {

          //   return <div id="enhanceComponent">11

          //     <Component {...props} />

          //     22
          //   </div>
          // },

          // enhanceApp: (App) => (props) => {
          enhanceComponent: (Component) => (props) => {
            // const collectStylesResult = (
            //   // <JssProvider
            //   //   registry={sheetsRegistry}
            //   //   generateClassName={generateClassName}
            //   // >
            //   //   {sheet.collectStyles(<App {...props} />)}
            //   // </JssProvider>

            //   <>
            //     {sheet.collectStyles(<App {...props} />)}
            //   </>
            // )

            // return collectStylesResult

            console.log('enhanceComponent props keys', Object.keys(props));

            const {
              // pageProps,
              ...other
            } = props;

            const newProps = {
              ...other,
              // pageProps: {
              // },
              // ...pageProps,
              // generateClassName,
              // sheetsRegistry,
            }

            // return sheet.collectStyles(<JssProvider
            //   registry={sheetsRegistry}
            //   generateClassName={generateClassName}
            // ><App {...newProps} /></JssProvider>);

            return <JssProvider
              registry={sheetsRegistry}
              generateClassName={generateClassName}
            >
              <MuiThemeProvider
                theme={muiTheme}
                sheetsManager={new Map()}
              >
                <Component {...newProps} />
              </MuiThemeProvider>
            </JssProvider>

            // return <App {...newProps} />
          },
        })

        return renderPageResult
      }

      const initialProps = await Document.getInitialProps(ctx)



      const css = sheetsRegistry.toString();

      // console.log('css', css);


      // console.log('Math.random()', Math.random());

      // console.log('initialProps', initialProps);

      // return initialProps;

      const result = {
        ...initialProps,

        // Styles fragment is rendered after the app and page rendering finish.
        styles: [
          ...React.Children.toArray(initialProps.styles),
          // sheets.getStyleElement(),
          <style
            key="styles2"
            id="styles2"
          // dangerouslySetInnerHTML={{
          //   __html: `body > div {color: red;}`
          // }}
          />,
          <style
            key="styles" id="server-side-jss"
            dangerouslySetInnerHTML={{
              __html: css,
            }}
          />,
          // <Head
          //   key="styles"
          // >
          // </Head>
        ],
      }

      // console.log('result', result);

      return result;


      // return {
              //   ...initialProps,
              //   styles: (
              //     <>
              //       <div
              //         id="styles-div"
              //       >55
              //         {initialProps.styles}
              //         <style id="server-side-jss">{css}</style>
              //         {sheet.getStyleElement()}
              //     66  </div>
              //     </>
              //   ),
              // }
            } finally {
              // sheet.seal()
            }
  }
}
