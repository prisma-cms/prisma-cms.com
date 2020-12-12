/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { UserNoNestingFragment } from './UserNoNesting';
import { EthAccountNoNestingFragment } from './EthAccountNoNesting';
import { NotificationTypeNoNestingFragment } from './NotificationTypeNoNesting';
import { ProjectMemberNoNestingFragment } from './ProjectMemberNoNesting';
import { ProjectNoNestingFragment } from './ProjectNoNesting';
import { ResourceNoNestingFragment } from './ResourceNoNesting';
import { gql } from '@apollo/client';
import { UserNoNestingFragmentDoc } from './UserNoNesting';
import { EthAccountNoNestingFragmentDoc } from './EthAccountNoNesting';
import { NotificationTypeNoNestingFragmentDoc } from './NotificationTypeNoNesting';
import { ProjectMemberNoNestingFragmentDoc } from './ProjectMemberNoNesting';
import { ProjectNoNestingFragmentDoc } from './ProjectNoNesting';
import { ResourceNoNestingFragmentDoc } from './ResourceNoNesting';
export type User_Fragment = (
  { __typename?: 'User', EthAccounts?: Types.Maybe<Array<(
    { __typename?: 'EthAccount' }
    & EthAccountNoNestingFragment
  )>>, NotificationTypes?: Types.Maybe<Array<(
    { __typename?: 'NotificationType' }
    & NotificationTypeNoNestingFragment
  )>>, Projects?: Types.Maybe<Array<(
    { __typename?: 'ProjectMember', Project: (
      { __typename?: 'Project', Resource?: Types.Maybe<(
        { __typename?: 'Resource' }
        & ResourceNoNestingFragment
      )> }
      & ProjectNoNestingFragment
    ) }
    & ProjectMemberNoNestingFragment
  )>>, ProjectsCreated?: Types.Maybe<Array<(
    { __typename?: 'Project', Resource?: Types.Maybe<(
      { __typename?: 'Resource' }
      & ResourceNoNestingFragment
    )> }
    & ProjectNoNestingFragment
  )>> }
  & UserNoNestingFragment
);

export const User_FragmentDoc = gql`
    fragment user_ on User {
  ...UserNoNesting
  EthAccounts {
    ...EthAccountNoNesting
  }
  NotificationTypes {
    ...NotificationTypeNoNesting
  }
  Projects {
    ...ProjectMemberNoNesting
    Project {
      ...ProjectNoNesting
      Resource {
        ...ResourceNoNesting
      }
    }
  }
  ProjectsCreated {
    ...ProjectNoNesting
    Resource {
      ...ResourceNoNesting
    }
  }
}
    ${UserNoNestingFragmentDoc}
${EthAccountNoNestingFragmentDoc}
${NotificationTypeNoNestingFragmentDoc}
${ProjectMemberNoNestingFragmentDoc}
${ProjectNoNestingFragmentDoc}
${ResourceNoNestingFragmentDoc}`;