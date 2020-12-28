import styled from 'styled-components'
import { ReflexContainerStyledProps } from './interfaces'

export const ReflexContainerStyled = styled.div<ReflexContainerStyledProps>`
  /* border: 1px solid blue; */
  display: flex;
  height: 100%;
  flex-direction: ${({ flexDirection }) => flexDirection};
`
