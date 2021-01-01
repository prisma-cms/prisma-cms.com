/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { UserNoNestingFragment } from './UserNoNesting';
import { MeUserCodeChallengeCompletionFragment } from './MeUserCodeChallengeCompletion';
import { MeUserTimerFragment } from './MeUserTimer';
import { gql } from '@apollo/client';
import { UserNoNestingFragmentDoc } from './UserNoNesting';
import { MeUserCodeChallengeCompletionFragmentDoc } from './MeUserCodeChallengeCompletion';
import { MeUserTimerFragmentDoc } from './MeUserTimer';
export type MeUserFragment = (
  { __typename?: 'User', CodeChallengeCompletions?: Types.Maybe<Array<(
    { __typename?: 'CodeChallengeCompletion' }
    & MeUserCodeChallengeCompletionFragment
  )>>, EthAccounts?: Types.Maybe<Array<{ __typename?: 'EthAccount', id: string, address: string, balance?: Types.Maybe<number> }>>, Timers?: Types.Maybe<Array<(
    { __typename?: 'Timer' }
    & MeUserTimerFragment
  )>> }
  & UserNoNestingFragment
);

export const MeUserFragmentDoc = gql`
    fragment MeUser on User {
  ...UserNoNesting
  CodeChallengeCompletions {
    ...MeUserCodeChallengeCompletion
  }
  EthAccounts {
    id
    address
    balance(convert: ether)
  }
  Timers(first: 1, where: {stopedAt: null}) {
    ...MeUserTimer
  }
}
    ${UserNoNestingFragmentDoc}
${MeUserCodeChallengeCompletionFragmentDoc}
${MeUserTimerFragmentDoc}`;