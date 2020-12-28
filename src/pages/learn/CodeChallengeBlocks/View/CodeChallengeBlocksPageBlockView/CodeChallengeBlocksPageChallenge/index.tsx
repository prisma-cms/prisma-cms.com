import React from 'react'
import Link from 'next/link'
import { CodeChallengeBlocksPageChallengeProps } from './interfaces'
import { CodeChallengeBlocksPageChallengeStyled } from './styles'

const CodeChallengeBlocksPageChallenge: React.FC<CodeChallengeBlocksPageChallengeProps> = ({
  object,
}) => {
  const title = object.localeTitle || object.name

  return (
    <CodeChallengeBlocksPageChallengeStyled>
      <Link href={`/learn/exercises/${object.id}`}>
        <a title={`Перейти к выполнению задания "${title}"` || ''}>{title}</a>
      </Link>
    </CodeChallengeBlocksPageChallengeStyled>
  )
}

export default CodeChallengeBlocksPageChallenge
