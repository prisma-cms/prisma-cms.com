import styled from 'styled-components'

export const DropdownButtonStyled = styled.div`
  position: relative;

  .DropdownButton--menu-wrapper {
    position: absolute;
    bottom: calc(3rem + 6px);
    width: 100%;
    background: #17528c;
    text-align: center;
    /* border-bottom: 2px solid grey; */

    &,
    a {
      color: white;
    }

    a {
      border: 2px solid transparent;
      line-height: 3rem;
      &:hover {
        border-color: grey;
      }
    }
  }
`
