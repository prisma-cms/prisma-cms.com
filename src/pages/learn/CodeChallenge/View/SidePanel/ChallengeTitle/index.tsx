import React from 'react'
import { ChallengeTitleProps } from './interfaces'
import { ChallengeTitleStyled } from './styles'

const ChallengeTitle: React.FC<ChallengeTitleProps> = ({
  children,
  isCompleted,
}) => {
  return (
    <ChallengeTitleStyled className="challenge-title text-center">
      {isCompleted ? <span className="challenge-title--OK">✓</span> : null}
      {children || 'Happy Coding!'}
    </ChallengeTitleStyled>
  )
}

export default ChallengeTitle
