import React, { useCallback, useMemo, useState } from 'react'
import Typography from 'material-ui/Typography'
import { CodeChallengeBlocksPageBlockViewProps } from './interfaces'
import { CodeChallengeBlocksPageBlockViewStyled } from './styles'
import CodeChallengeBlocksPageChallenge from './CodeChallengeBlocksPageChallenge'
import Link from 'next/link'

export const CodeChallengeBlocksPageBlockView: React.FC<CodeChallengeBlocksPageBlockViewProps> = ({
  object,
  children,
  opened: openedProps = false,
}) => {
  const [opened, setOpened] = useState(openedProps)

  const toggleOpened = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()
      event.stopPropagation()
      setOpened(!opened)
    },
    [opened]
  )

  const block = object

  const content = useMemo(() => {
    if (!opened || !block) {
      return null
    }

    const children = block.Children
    const challenges = block.Challenges

    let content: React.ReactNode[] = []

    /**
     * For src/pages/learn/CodeChallengeBlocks/CodeChallengeBlock
     */
    if (challenges?.length) {
      return challenges.map((challenge) => {
        return (
          <CodeChallengeBlocksPageChallenge
            key={challenge.id}
            object={challenge}
          />
        )
      })
    }

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
      <Link href={`/learn/sections/${block.id}`}>
        <a onClick={toggleOpened}>
          <Typography className="title opener">
            {!opened ? '↳' : '↴'} {block.name}
          </Typography>
        </a>
      </Link>
      {content}
      {opened ? children : null}
    </CodeChallengeBlocksPageBlockViewStyled>
  )
}

export default CodeChallengeBlocksPageBlockView
