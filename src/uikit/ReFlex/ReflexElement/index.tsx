import React from 'react'
import { ReflexElementProps } from './interfaces'
import { ReflexElementStyled } from './styles'

const ReflexElement: React.FC<ReflexElementProps> = ({
  children,
  ...other
}) => {
  return <ReflexElementStyled {...other}>{children}</ReflexElementStyled>
}

export default ReflexElement
