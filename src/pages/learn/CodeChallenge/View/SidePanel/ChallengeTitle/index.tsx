import React, { useMemo } from 'react'
import CodeChallengeStatusIcon from '../../../components/StatusIcon'
import { ChallengeTitleProps } from './interfaces'
import { ChallengeTitleStyled } from './styles'

const ChallengeTitle: React.FC<ChallengeTitleProps> = ({
  children,
  // isCompleted,
  codeChallengeCompletion,
}) => {
  return useMemo(() => {
    return (
      <ChallengeTitleStyled className="challenge-title text-center">
        <CodeChallengeStatusIcon
          codeChallengeCompletion={codeChallengeCompletion}
        />{' '}
        {children || 'Happy Coding!'}
      </ChallengeTitleStyled>
    )
  }, [children, codeChallengeCompletion])
}

export default ChallengeTitle
