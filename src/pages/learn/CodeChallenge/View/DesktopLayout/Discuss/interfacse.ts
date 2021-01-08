import { CodeChallenge_Fragment, Scalars } from 'src/modules/gql/generated'

export type CodeChallengeDiscussProps = {
  challenge: CodeChallenge_Fragment
  topicId: Scalars['ID'] | undefined
}
