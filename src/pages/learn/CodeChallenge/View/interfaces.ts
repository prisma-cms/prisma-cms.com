import { CodeChallenge_Fragment } from 'src/modules/gql/generated'
import { CodeChallengeContext } from '../Context'

export interface CodeChallengeViewProps {
  object: CodeChallenge_Fragment
  codeChallengeCompletion: CodeChallengeContext['codeChallengeCompletion']
}
