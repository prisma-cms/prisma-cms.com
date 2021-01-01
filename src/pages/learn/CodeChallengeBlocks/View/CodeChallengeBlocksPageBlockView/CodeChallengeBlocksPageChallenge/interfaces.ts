import { ChallengeFragment } from 'src/modules/gql/generated'
import { CodeChallengeContext } from 'src/pages/learn/CodeChallenge/Context'

export interface CodeChallengeBlocksPageChallengeProps {
  object: ChallengeFragment

  codeChallengeCompletion: CodeChallengeContext['codeChallengeCompletion']
}
