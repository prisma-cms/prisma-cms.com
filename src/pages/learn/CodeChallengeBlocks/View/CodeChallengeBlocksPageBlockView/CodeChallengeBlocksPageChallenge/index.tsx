import React from 'react'
import Link from 'next/link'
import { CodeChallengeBlocksPageChallengeProps } from './interfaces'
import { CodeChallengeBlocksPageChallengeStyled } from './styles'
import CodeChallengeStatusIcon from 'src/pages/learn/CodeChallenge/components/StatusIcon'

const CodeChallengeBlocksPageChallenge: React.FC<CodeChallengeBlocksPageChallengeProps> = ({
  object,
  codeChallengeCompletion,
}) => {
  const { name, localeTitle, time } = object

  const title = localeTitle || name

  return (
    <CodeChallengeBlocksPageChallengeStyled>
      <CodeChallengeStatusIcon
        codeChallengeCompletion={codeChallengeCompletion}
      />{' '}
      <Link href={`/learn/exercises/${object.id}`}>
        <a title={`Перейти к выполнению задания "${title}"` || ''}>{title}</a>
      </Link>{' '}
      {time}
    </CodeChallengeBlocksPageChallengeStyled>
  )
}

export default CodeChallengeBlocksPageChallenge
