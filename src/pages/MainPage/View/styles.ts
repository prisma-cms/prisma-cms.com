import styled from 'styled-components'

export const MainPageViewStyled = styled.div`
  /* h1, h2 {
    color: #333;
  } */

  pre {
    white-space: pre-wrap;
  }

  > .paper {
    margin-top: 30px;
    padding: 16px;

    .paper--title {
      margin-bottom: 20px;
    }

    .slick-slider {
      margin-bottom: 20px;

      .slick-dots li button:before {
        font-size: 20px;
      }

      .slider--content {
        padding-right: 30px;
      }
    }
  }
`
