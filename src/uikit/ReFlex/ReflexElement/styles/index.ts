import styled from 'styled-components'
import { ReflexElementStyledProps } from './interfaces'

export const ReflexElementStyled = styled.div<ReflexElementStyledProps>`
  /* display: flex; */
  /* flex-basis: 100%; */
  flex: ${({ flex }) => flex};
  overflow: ${({ overflow }) => overflow || 'auto'};
  position: relative;
  border: 1px solid lightgrey;
`
