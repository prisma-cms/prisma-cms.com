import React from 'react'
import Typography from 'material-ui/Typography'
import CodeChallengeBlocksPageBlockView from './CodeChallengeBlocksPageBlockView'
import { CodeChallengeBlocksViewProps } from './interfaces'
import { CodeChallengeBlocksPageStyled } from './styles'

const CodeChallengeBlocksPageView: React.FC<CodeChallengeBlocksViewProps> = ({
  objects,
}) => {
  return (
    <CodeChallengeBlocksPageStyled>
      <Typography variant="title">Учебные материалы</Typography>

      <Typography>
        Здесь вы можете пройти различные практические задания.
      </Typography>

      {objects.map((n) => {
        return <CodeChallengeBlocksPageBlockView key={n.id} object={n} />
      })}
    </CodeChallengeBlocksPageStyled>
  )
}

export default CodeChallengeBlocksPageView
