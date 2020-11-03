/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { TimersConnectionTimerFragment } from './timersConnectionTimer';
import { gql } from '@apollo/client';
import { TimersConnectionTimerFragmentDoc } from './timersConnectionTimer';
import * as Apollo from '@apollo/client';
export type TimersConnectionQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.TimerWhereInput>;
  orderBy?: Types.Maybe<Types.TimerOrderByInput>;
  skip?: Types.Maybe<Types.Scalars['Int']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  before?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
}>;


export type TimersConnectionQuery = { __typename?: 'Query', objectsConnection: { __typename?: 'TimerConnection', aggregate: { __typename?: 'AggregateTimer', count: number }, edges: Array<Types.Maybe<{ __typename?: 'TimerEdge', node: (
        { __typename?: 'Timer' }
        & TimersConnectionTimerFragment
      ) }>> } };


export const TimersConnectionDocument = gql`
    query timersConnection($where: TimerWhereInput, $orderBy: TimerOrderByInput = createdAt_DESC, $skip: Int, $after: String, $before: String, $first: Int = 10, $last: Int) {
  objectsConnection: timersConnection(
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
        ...timersConnectionTimer
      }
    }
  }
}
    ${TimersConnectionTimerFragmentDoc}`;

/**
 * __useTimersConnectionQuery__
 *
 * To run a query within a React component, call `useTimersConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useTimersConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimersConnectionQuery({
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
export function useTimersConnectionQuery(baseOptions?: Apollo.QueryHookOptions<TimersConnectionQuery, TimersConnectionQueryVariables>) {
        return Apollo.useQuery<TimersConnectionQuery, TimersConnectionQueryVariables>(TimersConnectionDocument, baseOptions);
      }
export function useTimersConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TimersConnectionQuery, TimersConnectionQueryVariables>) {
          return Apollo.useLazyQuery<TimersConnectionQuery, TimersConnectionQueryVariables>(TimersConnectionDocument, baseOptions);
        }
export type TimersConnectionQueryHookResult = ReturnType<typeof useTimersConnectionQuery>;
export type TimersConnectionLazyQueryHookResult = ReturnType<typeof useTimersConnectionLazyQuery>;
export type TimersConnectionQueryResult = Apollo.QueryResult<TimersConnectionQuery, TimersConnectionQueryVariables>;