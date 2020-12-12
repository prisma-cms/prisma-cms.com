/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { Resource_Fragment } from './resource_';
import { gql } from '@apollo/client';
import { Resource_FragmentDoc } from './resource_';
import * as Apollo from '@apollo/client';
export type ResourceQueryVariables = Types.Exact<{
  where: Types.ResourceWhereUniqueInput;
}>;


export type ResourceQuery = { __typename?: 'Query', object?: Types.Maybe<(
    { __typename?: 'Resource' }
    & Resource_Fragment
  )> };


export const ResourceDocument = gql`
    query resource($where: ResourceWhereUniqueInput!) {
  object: resource(where: $where) {
    ...resource_
  }
}
    ${Resource_FragmentDoc}`;

/**
 * __useResourceQuery__
 *
 * To run a query within a React component, call `useResourceQuery` and pass it any options that fit your needs.
 * When your component renders, `useResourceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResourceQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useResourceQuery(baseOptions: Apollo.QueryHookOptions<ResourceQuery, ResourceQueryVariables>) {
        return Apollo.useQuery<ResourceQuery, ResourceQueryVariables>(ResourceDocument, baseOptions);
      }
export function useResourceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ResourceQuery, ResourceQueryVariables>) {
          return Apollo.useLazyQuery<ResourceQuery, ResourceQueryVariables>(ResourceDocument, baseOptions);
        }
export type ResourceQueryHookResult = ReturnType<typeof useResourceQuery>;
export type ResourceLazyQueryHookResult = ReturnType<typeof useResourceLazyQuery>;
export type ResourceQueryResult = Apollo.QueryResult<ResourceQuery, ResourceQueryVariables>;