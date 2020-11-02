/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { ProjectsConnectionProjectFragment } from './projectsConnectionProject';
import { gql } from '@apollo/client';
import { ProjectsConnectionProjectFragmentDoc } from './projectsConnectionProject';
import * as Apollo from '@apollo/client';
export type ProjectsConnectionQueryVariables = Types.Exact<{
  first?: Types.Maybe<Types.Scalars['Int']>;
  skip?: Types.Maybe<Types.Scalars['Int']>;
  where?: Types.Maybe<Types.ProjectWhereInput>;
  orderBy?: Types.Maybe<Types.ProjectOrderByInput>;
}>;


export type ProjectsConnectionQuery = { __typename?: 'Query', objectsConnection: { __typename?: 'ProjectConnection', aggregate: { __typename?: 'AggregateProject', count: number }, edges: Array<Types.Maybe<{ __typename?: 'ProjectEdge', node: (
        { __typename?: 'Project' }
        & ProjectsConnectionProjectFragment
      ) }>> } };


export const ProjectsConnectionDocument = gql`
    query projectsConnection($first: Int = 12, $skip: Int, $where: ProjectWhereInput, $orderBy: ProjectOrderByInput = updatedAt_DESC) {
  objectsConnection: projectsConnection(
    orderBy: $orderBy
    first: $first
    skip: $skip
    where: $where
  ) {
    aggregate {
      count
    }
    edges {
      node {
        ...projectsConnectionProject
      }
    }
  }
}
    ${ProjectsConnectionProjectFragmentDoc}`;

/**
 * __useProjectsConnectionQuery__
 *
 * To run a query within a React component, call `useProjectsConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsConnectionQuery({
 *   variables: {
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useProjectsConnectionQuery(baseOptions?: Apollo.QueryHookOptions<ProjectsConnectionQuery, ProjectsConnectionQueryVariables>) {
        return Apollo.useQuery<ProjectsConnectionQuery, ProjectsConnectionQueryVariables>(ProjectsConnectionDocument, baseOptions);
      }
export function useProjectsConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsConnectionQuery, ProjectsConnectionQueryVariables>) {
          return Apollo.useLazyQuery<ProjectsConnectionQuery, ProjectsConnectionQueryVariables>(ProjectsConnectionDocument, baseOptions);
        }
export type ProjectsConnectionQueryHookResult = ReturnType<typeof useProjectsConnectionQuery>;
export type ProjectsConnectionLazyQueryHookResult = ReturnType<typeof useProjectsConnectionLazyQuery>;
export type ProjectsConnectionQueryResult = Apollo.QueryResult<ProjectsConnectionQuery, ProjectsConnectionQueryVariables>;