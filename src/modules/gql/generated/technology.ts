/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { Technology_Fragment } from './technology_';
import { gql } from '@apollo/client';
import { Technology_FragmentDoc } from './technology_';
import * as Apollo from '@apollo/client';
export type TechnologyQueryVariables = Types.Exact<{
  where: Types.TechnologyWhereUniqueInput;
}>;


export type TechnologyQuery = { __typename?: 'Query', object?: Types.Maybe<(
    { __typename?: 'Technology' }
    & Technology_Fragment
  )> };


export const TechnologyDocument = gql`
    query technology($where: TechnologyWhereUniqueInput!) {
  object: technology(where: $where) {
    ...technology_
  }
}
    ${Technology_FragmentDoc}`;

/**
 * __useTechnologyQuery__
 *
 * To run a query within a React component, call `useTechnologyQuery` and pass it any options that fit your needs.
 * When your component renders, `useTechnologyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTechnologyQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useTechnologyQuery(baseOptions: Apollo.QueryHookOptions<TechnologyQuery, TechnologyQueryVariables>) {
        return Apollo.useQuery<TechnologyQuery, TechnologyQueryVariables>(TechnologyDocument, baseOptions);
      }
export function useTechnologyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TechnologyQuery, TechnologyQueryVariables>) {
          return Apollo.useLazyQuery<TechnologyQuery, TechnologyQueryVariables>(TechnologyDocument, baseOptions);
        }
export type TechnologyQueryHookResult = ReturnType<typeof useTechnologyQuery>;
export type TechnologyLazyQueryHookResult = ReturnType<typeof useTechnologyLazyQuery>;
export type TechnologyQueryResult = Apollo.QueryResult<TechnologyQuery, TechnologyQueryVariables>;