/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type SitemapResourcesConnectionQueryVariables = Types.Exact<{
  first: Types.Scalars['Int'];
  skip?: Types.Maybe<Types.Scalars['Int']>;
  where: Types.ResourceWhereInput;
  orderBy: Types.ResourceOrderByInput;
}>;


export type SitemapResourcesConnectionQuery = { __typename?: 'Query', resourcesConnection: { __typename?: 'ResourceConnection', aggregate: { __typename?: 'AggregateResource', count: number }, edges: Array<Types.Maybe<{ __typename?: 'ResourceEdge', node: { __typename?: 'Resource', id: string, uri: string, updatedAt: Date } }>> } };


export const SitemapResourcesConnectionDocument = gql`
    query sitemapResourcesConnection($first: Int!, $skip: Int, $where: ResourceWhereInput!, $orderBy: ResourceOrderByInput!) {
  resourcesConnection(
    first: $first
    skip: $skip
    where: $where
    orderBy: $orderBy
  ) {
    aggregate {
      count
    }
    edges {
      node {
        id
        uri
        updatedAt
      }
    }
  }
}
    `;

/**
 * __useSitemapResourcesConnectionQuery__
 *
 * To run a query within a React component, call `useSitemapResourcesConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useSitemapResourcesConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSitemapResourcesConnectionQuery({
 *   variables: {
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useSitemapResourcesConnectionQuery(baseOptions: Apollo.QueryHookOptions<SitemapResourcesConnectionQuery, SitemapResourcesConnectionQueryVariables>) {
        return Apollo.useQuery<SitemapResourcesConnectionQuery, SitemapResourcesConnectionQueryVariables>(SitemapResourcesConnectionDocument, baseOptions);
      }
export function useSitemapResourcesConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SitemapResourcesConnectionQuery, SitemapResourcesConnectionQueryVariables>) {
          return Apollo.useLazyQuery<SitemapResourcesConnectionQuery, SitemapResourcesConnectionQueryVariables>(SitemapResourcesConnectionDocument, baseOptions);
        }
export type SitemapResourcesConnectionQueryHookResult = ReturnType<typeof useSitemapResourcesConnectionQuery>;
export type SitemapResourcesConnectionLazyQueryHookResult = ReturnType<typeof useSitemapResourcesConnectionLazyQuery>;
export type SitemapResourcesConnectionQueryResult = Apollo.QueryResult<SitemapResourcesConnectionQuery, SitemapResourcesConnectionQueryVariables>;