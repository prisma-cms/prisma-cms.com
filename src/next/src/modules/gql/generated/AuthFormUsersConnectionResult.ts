/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { AuthFormUsersConnectionUserFragment } from './AuthFormUsersConnectionUser';
import { gql } from '@apollo/client';
import { AuthFormUsersConnectionUserFragmentDoc } from './AuthFormUsersConnectionUser';
export type AuthFormUsersConnectionResultFragment = { __typename?: 'UserConnection', aggregate: { __typename?: 'AggregateUser', count: number }, edges: Array<Types.Maybe<{ __typename?: 'UserEdge', node: (
      { __typename?: 'User' }
      & AuthFormUsersConnectionUserFragment
    ) }>> };

export const AuthFormUsersConnectionResultFragmentDoc = gql`
    fragment AuthFormUsersConnectionResult on UserConnection {
  aggregate {
    count
  }
  edges {
    node {
      ...AuthFormUsersConnectionUser
    }
  }
}
    ${AuthFormUsersConnectionUserFragmentDoc}`;