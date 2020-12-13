import styled, { css } from 'styled-components'
import { LayoutStyledProps } from './interfaces'

export const LayoutStyled = styled.div<LayoutStyledProps>`
  height: 100%;
  display: flex;
  flex-direction: column;

  a {
    color: #17528c;
    text-decoration: none;

    &:hover {
      color: #111;
    }
  }

  .DraftEditor-editorContainer {
    line-height: 1.6;
  }

  table {
    width: 100%;

    &.prisma-cms {
      border-collapse: collapse;

      td,
      th {
        padding: 3px 5px;
      }

      &.bordered {
        td,
        th {
          border: 1px solid #ddd;
        }
      }

      &.centered {
        td,
        th {
          text-align: center;
        }
      }
    }
  }

  #wrapper {
    height: 100%;
    overflow: auto;
  }

  #content {
    height: 100%;
  }

  ${({ variant }) => {
    switch (variant) {
      case 'fullwidth':
        return css`
          /* #content {
          border: 2px solid blue;
        } */
        `

      default:
        return css`
          #content {
            /* border: 2px solid red; */
            padding: 20px 16px;
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;
          }
        `
    }
  }}
`
