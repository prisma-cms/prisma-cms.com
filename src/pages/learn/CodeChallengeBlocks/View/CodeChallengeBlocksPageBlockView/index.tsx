import React, { useCallback, useMemo, useState } from 'react'
import Typography from 'material-ui/Typography'
import { CodeChallengeBlocksPageBlockViewProps } from './interfaces'
import { CodeChallengeBlocksPageBlockViewStyled } from './styles'
import CodeChallengeBlocksPageChallenge from './CodeChallengeBlocksPageChallenge'

export const CodeChallengeBlocksPageBlockView: React.FC<CodeChallengeBlocksPageBlockViewProps> = ({
  object,
  children,
}) => {
  const [opened, setOpened] = useState(false)

  const toggleOpened = useCallback(() => {
    setOpened(!opened)
  }, [opened])

  const block = object

  const content = useMemo(() => {
    if (!opened || !block) {
      return null
    }

    const children = block.Children

    let content: React.ReactNode[] = []

    if (children) {
      content = children.map((n) => {
        const challenges = n.Challenges || []

        return (
          <CodeChallengeBlocksPageBlockView key={n.id} object={n}>
            {challenges.map((challenge) => {
              return (
                <CodeChallengeBlocksPageChallenge
                  key={challenge.id}
                  object={challenge}
                />
              )
            })}
          </CodeChallengeBlocksPageBlockView>
        )
      })
    }

    return content
  }, [block, opened])

  if (!block) {
    return null
  }

  return (
    <CodeChallengeBlocksPageBlockViewStyled>
      <Typography onClick={toggleOpened} className="title opener">
        {!opened ? '↳' : '↴'} {block.name}
      </Typography>
      {content}
      {opened ? children : null}
    </CodeChallengeBlocksPageBlockViewStyled>
  )
}

export default CodeChallengeBlocksPageBlockView
