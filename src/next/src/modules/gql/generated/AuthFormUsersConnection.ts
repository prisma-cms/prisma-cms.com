/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { AuthFormUsersConnectionResultFragment } from './AuthFormUsersConnectionResult';
import { gql } from '@apollo/client';
import { AuthFormUsersConnectionResultFragmentDoc } from './AuthFormUsersConnectionResult';
import * as Apollo from '@apollo/client';
export type AuthFormUsersConnectionQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.UserWhereInput>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  skip?: Types.Maybe<Types.Scalars['Int']>;
  orderBy?: Types.Maybe<Types.UserOrderByInput>;
}>;


export type AuthFormUsersConnectionQuery = { __typename?: 'Query', objectsConnection: (
    { __typename?: 'UserConnection' }
    & AuthFormUsersConnectionResultFragment
  ) };


export const AuthFormUsersConnectionDocument = gql`
    query AuthFormUsersConnection($where: UserWhereInput, $first: Int = 10, $skip: Int, $orderBy: UserOrderByInput) {
  objectsConnection: usersConnection(
    where: $where
    first: $first
    skip: $skip
    orderBy: $orderBy
  ) {
    ...AuthFormUsersConnectionResult
  }
}
    ${AuthFormUsersConnectionResultFragmentDoc}`;

/**
 * __useAuthFormUsersConnectionQuery__
 *
 * To run a query within a React component, call `useAuthFormUsersConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthFormUsersConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthFormUsersConnectionQuery({
 *   variables: {
 *      where: // value for 'where'
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useAuthFormUsersConnectionQuery(baseOptions?: Apollo.QueryHookOptions<AuthFormUsersConnectionQuery, AuthFormUsersConnectionQueryVariables>) {
        return Apollo.useQuery<AuthFormUsersConnectionQuery, AuthFormUsersConnectionQueryVariables>(AuthFormUsersConnectionDocument, baseOptions);
      }
export function useAuthFormUsersConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthFormUsersConnectionQuery, AuthFormUsersConnectionQueryVariables>) {
          return Apollo.useLazyQuery<AuthFormUsersConnectionQuery, AuthFormUsersConnectionQueryVariables>(AuthFormUsersConnectionDocument, baseOptions);
        }
export type AuthFormUsersConnectionQueryHookResult = ReturnType<typeof useAuthFormUsersConnectionQuery>;
export type AuthFormUsersConnectionLazyQueryHookResult = ReturnType<typeof useAuthFormUsersConnectionLazyQuery>;
export type AuthFormUsersConnectionQueryResult = Apollo.QueryResult<AuthFormUsersConnectionQuery, AuthFormUsersConnectionQueryVariables>;