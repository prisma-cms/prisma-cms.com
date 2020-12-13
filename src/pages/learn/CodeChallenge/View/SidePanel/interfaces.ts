import { CodeChallenge_Fragment } from 'src/modules/gql/generated'

export interface SidePanelProps {
  className?: string
  // description?: string | null | undefined
  object: CodeChallenge_Fragment

  showToolPanel: boolean
}
