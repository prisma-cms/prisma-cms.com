import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

  html, body {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
  }
  * {
    box-sizing: border-box;
  }

  #__next {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;

    > #content {
      flex-grow: 1;
      overflow: auto;
    }
  }
`

const theme = {
  colors: {
    primary: '#333',
  },
}

export default theme
