import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body{
    height: 100%;
  }

  body {
    font-family: Roboto, sans-serif, Tahoma, Helvetica;
    font-size: 14px;
    padding: 0;
    margin: 0;
  }

  #__next {
    height: 100%;
  }

`

export default GlobalStyle
