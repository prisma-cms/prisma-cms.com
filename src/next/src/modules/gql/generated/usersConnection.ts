/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { UsersConnectionUserFragment } from './usersConnectionUser';
import { gql } from '@apollo/client';
import { UsersConnectionUserFragmentDoc } from './usersConnectionUser';
import * as Apollo from '@apollo/client';
export type UsersConnectionQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.UserWhereInput>;
  orderBy?: Types.Maybe<Types.UserOrderByInput>;
  skip?: Types.Maybe<Types.Scalars['Int']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  before?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
}>;


export type UsersConnectionQuery = { __typename?: 'Query', objectsConnection: { __typename?: 'UserConnection', aggregate: { __typename?: 'AggregateUser', count: number }, edges: Array<Types.Maybe<{ __typename?: 'UserEdge', node: (
        { __typename?: 'User' }
        & UsersConnectionUserFragment
      ) }>> } };


export const UsersConnectionDocument = gql`
    query usersConnection($where: UserWhereInput, $orderBy: UserOrderByInput = createdAt_ASC, $skip: Int, $after: String, $before: String, $first: Int = 10, $last: Int) {
  objectsConnection: usersConnection(
    where: $where
    orderBy: $orderBy
    skip: $skip
    after: $after
    before: $before
    first: $first
    last: $last
  ) {
    aggregate {
      count
    }
    edges {
      node {
        ...usersConnectionUser
      }
    }
  }
}
    ${UsersConnectionUserFragmentDoc}`;

/**
 * __useUsersConnectionQuery__
 *
 * To run a query within a React component, call `useUsersConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersConnectionQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *   },
 * });
 */
export function useUsersConnectionQuery(baseOptions?: Apollo.QueryHookOptions<UsersConnectionQuery, UsersConnectionQueryVariables>) {
        return Apollo.useQuery<UsersConnectionQuery, UsersConnectionQueryVariables>(UsersConnectionDocument, baseOptions);
      }
export function useUsersConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersConnectionQuery, UsersConnectionQueryVariables>) {
          return Apollo.useLazyQuery<UsersConnectionQuery, UsersConnectionQueryVariables>(UsersConnectionDocument, baseOptions);
        }
export type UsersConnectionQueryHookResult = ReturnType<typeof useUsersConnectionQuery>;
export type UsersConnectionLazyQueryHookResult = ReturnType<typeof useUsersConnectionLazyQuery>;
export type UsersConnectionQueryResult = Apollo.QueryResult<UsersConnectionQuery, UsersConnectionQueryVariables>;