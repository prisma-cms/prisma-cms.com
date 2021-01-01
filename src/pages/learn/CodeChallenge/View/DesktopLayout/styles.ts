import { ReflexContainerStyled } from 'src/uikit/ReFlex/ReflexContainer/styles'
import styled from 'styled-components'

export const DesktopLayoutStyled = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  > ${ReflexContainerStyled} {
    height: 100%;
    overflow: auto;
  }

  .auth-reminder {
    padding: 10px;
    /* border-bottom: 1px solid lightgrey; */

    button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      color: #17528c;
    }
  }
`
