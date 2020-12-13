/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type SitemapUsersConnectionQueryVariables = Types.Exact<{
  first: Types.Scalars['Int'];
  skip?: Types.Maybe<Types.Scalars['Int']>;
  where: Types.UserWhereInput;
  orderBy: Types.UserOrderByInput;
}>;


export type SitemapUsersConnectionQuery = { __typename?: 'Query', usersConnection: { __typename?: 'UserConnection', aggregate: { __typename?: 'AggregateUser', count: number }, edges: Array<Types.Maybe<{ __typename?: 'UserEdge', node: { __typename?: 'User', id: string, username?: Types.Maybe<string>, updatedAt: Date } }>> } };


export const SitemapUsersConnectionDocument = gql`
    query sitemapUsersConnection($first: Int!, $skip: Int, $where: UserWhereInput!, $orderBy: UserOrderByInput!) {
  usersConnection(first: $first, skip: $skip, where: $where, orderBy: $orderBy) {
    aggregate {
      count
    }
    edges {
      node {
        id
        username
        updatedAt
      }
    }
  }
}
    `;

/**
 * __useSitemapUsersConnectionQuery__
 *
 * To run a query within a React component, call `useSitemapUsersConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useSitemapUsersConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSitemapUsersConnectionQuery({
 *   variables: {
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useSitemapUsersConnectionQuery(baseOptions: Apollo.QueryHookOptions<SitemapUsersConnectionQuery, SitemapUsersConnectionQueryVariables>) {
        return Apollo.useQuery<SitemapUsersConnectionQuery, SitemapUsersConnectionQueryVariables>(SitemapUsersConnectionDocument, baseOptions);
      }
export function useSitemapUsersConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SitemapUsersConnectionQuery, SitemapUsersConnectionQueryVariables>) {
          return Apollo.useLazyQuery<SitemapUsersConnectionQuery, SitemapUsersConnectionQueryVariables>(SitemapUsersConnectionDocument, baseOptions);
        }
export type SitemapUsersConnectionQueryHookResult = ReturnType<typeof useSitemapUsersConnectionQuery>;
export type SitemapUsersConnectionLazyQueryHookResult = ReturnType<typeof useSitemapUsersConnectionLazyQuery>;
export type SitemapUsersConnectionQueryResult = Apollo.QueryResult<SitemapUsersConnectionQuery, SitemapUsersConnectionQueryVariables>;