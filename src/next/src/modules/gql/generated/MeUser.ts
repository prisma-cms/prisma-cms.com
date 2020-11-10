/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { UserNoNestingFragment } from './UserNoNesting';
import { TimerNoNestingFragment } from './TimerNoNesting';
import { TaskNoNestingFragment } from './TaskNoNesting';
import { ProjectNoNestingFragment } from './ProjectNoNesting';
import { gql } from '@apollo/client';
import { UserNoNestingFragmentDoc } from './UserNoNesting';
import { TimerNoNestingFragmentDoc } from './TimerNoNesting';
import { TaskNoNestingFragmentDoc } from './TaskNoNesting';
import { ProjectNoNestingFragmentDoc } from './ProjectNoNesting';
export type MeUserFragment = (
  { __typename?: 'User', EthAccounts?: Types.Maybe<Array<{ __typename?: 'EthAccount', id: string, address: string, balance?: Types.Maybe<number> }>>, Timers?: Types.Maybe<Array<(
    { __typename?: 'Timer', Task: (
      { __typename?: 'Task', TaskProjects?: Types.Maybe<Array<{ __typename?: 'ProjectTask', id: string, createdAt: any, updatedAt: any, Project: (
          { __typename?: 'Project' }
          & ProjectNoNestingFragment
        ) }>> }
      & TaskNoNestingFragment
    ) }
    & TimerNoNestingFragment
  )>> }
  & UserNoNestingFragment
);

export const MeUserFragmentDoc = gql`
    fragment MeUser on User {
  ...UserNoNesting
  EthAccounts {
    id
    address
    balance(convert: ether)
  }
  Timers(first: 1, where: {stopedAt: null}) {
    ...TimerNoNesting
    Task {
      ...TaskNoNesting
      TaskProjects {
        id
        createdAt
        updatedAt
        Project {
          ...ProjectNoNesting
        }
      }
    }
  }
}
    ${UserNoNestingFragmentDoc}
${TimerNoNestingFragmentDoc}
${TaskNoNestingFragmentDoc}
${ProjectNoNestingFragmentDoc}`;