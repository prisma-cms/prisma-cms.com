/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { ChallengeBlockNoNestingFragment } from './challengeBlockNoNesting';
import { ChallengeFragment } from './challenge';
import { gql } from '@apollo/client';
import { ChallengeBlockNoNestingFragmentDoc } from './challengeBlockNoNesting';
import { ChallengeFragmentDoc } from './challenge';
export type CodeChallengeBlocksBlockFragment = (
  { __typename?: 'CodeChallengeBlock', Challenges?: Types.Maybe<Array<(
    { __typename?: 'CodeChallenge' }
    & ChallengeFragment
  )>>, Children?: Types.Maybe<Array<(
    { __typename?: 'CodeChallengeBlock', Challenges?: Types.Maybe<Array<(
      { __typename?: 'CodeChallenge' }
      & ChallengeFragment
    )>> }
    & ChallengeBlockNoNestingFragment
  )>> }
  & ChallengeBlockNoNestingFragment
);

export const CodeChallengeBlocksBlockFragmentDoc = gql`
    fragment codeChallengeBlocksBlock on CodeChallengeBlock {
  ...challengeBlockNoNesting
  Challenges(orderBy: rank_ASC) {
    ...challenge
  }
  Children(orderBy: rank_ASC) {
    ...challengeBlockNoNesting
    Challenges(orderBy: rank_ASC) {
      ...challenge
    }
  }
}
    ${ChallengeBlockNoNestingFragmentDoc}
${ChallengeFragmentDoc}`;