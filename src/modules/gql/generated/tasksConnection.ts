/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { TasksConnectionTaskFragment } from './tasksConnectionTask';
import { gql } from '@apollo/client';
import { TasksConnectionTaskFragmentDoc } from './tasksConnectionTask';
import * as Apollo from '@apollo/client';
export type TasksConnectionQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.TaskWhereInput>;
  orderBy?: Types.Maybe<Types.TaskOrderByInput>;
  skip?: Types.Maybe<Types.Scalars['Int']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  before?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
}>;


export type TasksConnectionQuery = { __typename?: 'Query', objectsConnection: { __typename?: 'TaskConnection', aggregate: { __typename?: 'AggregateTask', count: number }, edges: Array<Types.Maybe<{ __typename?: 'TaskEdge', node: (
        { __typename?: 'Task' }
        & TasksConnectionTaskFragment
      ) }>> } };


export const TasksConnectionDocument = gql`
    query tasksConnection($where: TaskWhereInput, $orderBy: TaskOrderByInput = createdAt_DESC, $skip: Int, $after: String, $before: String, $first: Int = 10, $last: Int) {
  objectsConnection: tasksConnection(
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
        ...tasksConnectionTask
      }
    }
  }
}
    ${TasksConnectionTaskFragmentDoc}`;

/**
 * __useTasksConnectionQuery__
 *
 * To run a query within a React component, call `useTasksConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useTasksConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTasksConnectionQuery({
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
export function useTasksConnectionQuery(baseOptions?: Apollo.QueryHookOptions<TasksConnectionQuery, TasksConnectionQueryVariables>) {
        return Apollo.useQuery<TasksConnectionQuery, TasksConnectionQueryVariables>(TasksConnectionDocument, baseOptions);
      }
export function useTasksConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TasksConnectionQuery, TasksConnectionQueryVariables>) {
          return Apollo.useLazyQuery<TasksConnectionQuery, TasksConnectionQueryVariables>(TasksConnectionDocument, baseOptions);
        }
export type TasksConnectionQueryHookResult = ReturnType<typeof useTasksConnectionQuery>;
export type TasksConnectionLazyQueryHookResult = ReturnType<typeof useTasksConnectionLazyQuery>;
export type TasksConnectionQueryResult = Apollo.QueryResult<TasksConnectionQuery, TasksConnectionQueryVariables>;