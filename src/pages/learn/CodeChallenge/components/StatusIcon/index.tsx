import React, { useMemo } from 'react'

import { TaskStatus } from 'src/modules/gql/generated'
import { CodeChallengeStatusIconProps } from './interfaces'
import { CodeChallengeStatusIconStyled } from './styles'

/**
 * Иконка статуса выполнения задания
 */
const CodeChallengeStatusIcon: React.FC<CodeChallengeStatusIconProps> = ({
  codeChallengeCompletion,
}) => {
  return useMemo(() => {
    let icon: JSX.Element | undefined

    const taskStatus = codeChallengeCompletion?.Task.status

    switch (taskStatus) {
      case undefined:
        break
      case TaskStatus.DONE:
      case TaskStatus.COMPLETED:
        icon = <span className="icon OK">✓</span>
        break
      default:
        icon = <span className="icon PROGRESS">⌛</span>
        break
    }

    return <CodeChallengeStatusIconStyled>{icon}</CodeChallengeStatusIconStyled>
  }, [codeChallengeCompletion?.Task.status])
}

export default CodeChallengeStatusIcon
