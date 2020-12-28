import { CodeChallenge_Fragment } from 'src/modules/gql/generated'
import { ToolPanelProps } from './ToolPanel/interfaces'

export interface SidePanelProps {
  className?: string
  // description?: string | null | undefined
  object: CodeChallenge_Fragment

  showToolPanel: boolean

  executeChallenge: ToolPanelProps['executeChallenge']
}
