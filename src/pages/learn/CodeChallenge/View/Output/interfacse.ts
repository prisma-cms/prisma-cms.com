import { CodeChallengeContext } from '../../Context'

export type CodeChallengeOutputViewProps = Pick<
  CodeChallengeContext['logger'],
  'output'
>
