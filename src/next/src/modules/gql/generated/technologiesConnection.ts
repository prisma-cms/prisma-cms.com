/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { TechnologiesConnectionTechnologyFragment } from './technologiesConnectionTechnology';
import { gql } from '@apollo/client';
import { TechnologiesConnectionTechnologyFragmentDoc } from './technologiesConnectionTechnology';
import * as Apollo from '@apollo/client';
export type TechnologiesConnectionQueryVariables = Types.Exact<{
  first?: Types.Maybe<Types.Scalars['Int']>;
  skip?: Types.Maybe<Types.Scalars['Int']>;
  where?: Types.Maybe<Types.TechnologyWhereInput>;
  orderBy?: Types.Maybe<Types.TechnologyOrderByInput>;
}>;


export type TechnologiesConnectionQuery = { __typename?: 'Query', objectsConnection: { __typename?: 'TechnologyConnection', aggregate: { __typename?: 'AggregateTechnology', count: number }, edges: Array<Types.Maybe<{ __typename?: 'TechnologyEdge', node: (
        { __typename?: 'Technology' }
        & TechnologiesConnectionTechnologyFragment
      ) }>> } };


export const TechnologiesConnectionDocument = gql`
    query technologiesConnection($first: Int = 10, $skip: Int, $where: TechnologyWhereInput, $orderBy: TechnologyOrderByInput = createdAt_DESC) {
  objectsConnection: technologiesConnection(
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
        ...technologiesConnectionTechnology
      }
    }
  }
}
    ${TechnologiesConnectionTechnologyFragmentDoc}`;

/**
 * __useTechnologiesConnectionQuery__
 *
 * To run a query within a React component, call `useTechnologiesConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useTechnologiesConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTechnologiesConnectionQuery({
 *   variables: {
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useTechnologiesConnectionQuery(baseOptions?: Apollo.QueryHookOptions<TechnologiesConnectionQuery, TechnologiesConnectionQueryVariables>) {
        return Apollo.useQuery<TechnologiesConnectionQuery, TechnologiesConnectionQueryVariables>(TechnologiesConnectionDocument, baseOptions);
      }
export function useTechnologiesConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TechnologiesConnectionQuery, TechnologiesConnectionQueryVariables>) {
          return Apollo.useLazyQuery<TechnologiesConnectionQuery, TechnologiesConnectionQueryVariables>(TechnologiesConnectionDocument, baseOptions);
        }
export type TechnologiesConnectionQueryHookResult = ReturnType<typeof useTechnologiesConnectionQuery>;
export type TechnologiesConnectionLazyQueryHookResult = ReturnType<typeof useTechnologiesConnectionLazyQuery>;
export type TechnologiesConnectionQueryResult = Apollo.QueryResult<TechnologiesConnectionQuery, TechnologiesConnectionQueryVariables>;