import React, { useContext, useMemo } from 'react'
import Typography from 'material-ui/Typography'
import { CodeChallengeBlocksPageBlockViewProps } from './interfaces'
import { CodeChallengeBlocksPageBlockViewStyled } from './styles'
import CodeChallengeBlocksPageChallenge from './CodeChallengeBlocksPageChallenge'
import Link from 'next/link'
import Context, { PrismaCmsContext } from '@prisma-cms/context'

export const CodeChallengeBlocksPageBlockView: React.FC<CodeChallengeBlocksPageBlockViewProps> = ({
  object,
  // children,
  opened = false,
}) => {
  const context = useContext(Context) as PrismaCmsContext

  // const [opened, setOpened] = useState(openedProps)

  // const toggleOpened = useCallback(
  //   (event: React.MouseEvent) => {
  //     event.preventDefault()
  //     event.stopPropagation()
  //     setOpened(!opened)
  //   },
  //   [opened]
  // )

  const block = object

  const [content, totalTime] = useMemo(() => {
    let totalTime = 0

    if (!block) {
      return []
    }

    const children = block.Children
    const challenges = block.Challenges

    let content: React.ReactNode[] = []

    /**
     * For src/pages/learn/CodeChallengeBlocks/CodeChallengeBlock
     */
    if (challenges?.length) {
      const challengesContent = challenges.map((challenge) => {
        const { time } = challenge

        if (time) {
          const match = time.match(/^([\d,.]+) *hours?/)

          const hours = match && match[0] ? parseFloat(match[0]) : null

          if (hours) {
            totalTime += hours
          }
        }

        const codeChallengeCompletion = context.user?.CodeChallengeCompletions?.find(
          (n) => n.CodeChallenge.id === challenge.id
        )

        return (
          <CodeChallengeBlocksPageChallenge
            key={challenge.id}
            object={challenge}
            codeChallengeCompletion={codeChallengeCompletion}
          />
        )
      })

      return [opened ? challengesContent : null, totalTime]
    }

    if (children && opened) {
      content = children.map((n) => {
        const challenges = n.Challenges || []

        return (
          <CodeChallengeBlocksPageBlockView key={n.id} object={n}>
            {challenges.map((challenge) => {
              const codeChallengeCompletion = context.user?.CodeChallengeCompletions?.find(
                (n) => n.CodeChallenge.id === challenge.id
              )

              return (
                <CodeChallengeBlocksPageChallenge
                  key={challenge.id}
                  object={challenge}
                  codeChallengeCompletion={codeChallengeCompletion}
                />
              )
            })}
          </CodeChallengeBlocksPageBlockView>
        )
      })
    }

    return [content, totalTime]
  }, [block, context.user?.CodeChallengeCompletions, opened])

  if (!block) {
    return null
  }

  return (
    <CodeChallengeBlocksPageBlockViewStyled>
      <div>
        <Link href={`/learn/sections/${block.id}`}>
          <a title={block.name || ''}>
            <Typography className="title opener" component="span">
              {!opened ? '↳' : '↴'} {block.name}
            </Typography>
          </a>
        </Link>{' '}
        {totalTime ? `${totalTime} hours` : null}
      </div>
      {content}
      {/* {opened ? children : null} */}
    </CodeChallengeBlocksPageBlockViewStyled>
  )
}

export default CodeChallengeBlocksPageBlockView
