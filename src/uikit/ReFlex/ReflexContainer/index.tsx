import React from 'react'
import { ReflexContainerProps } from './interfacse'
import { ReflexContainerStyled } from './styles'

const ReflexContainer: React.FC<ReflexContainerProps> = ({
  children,
  ...other
}) => {
  return <ReflexContainerStyled {...other}>{children}</ReflexContainerStyled>
}

export default ReflexContainer
