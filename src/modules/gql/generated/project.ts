/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { Project_Fragment } from './project_';
import { gql } from '@apollo/client';
import { Project_FragmentDoc } from './project_';
import * as Apollo from '@apollo/client';
export type ProjectQueryVariables = Types.Exact<{
  where: Types.ResourceWhereUniqueInput;
}>;


export type ProjectQuery = { __typename?: 'Query', object?: Types.Maybe<{ __typename?: 'Resource', id: string, name: string, uri: string, type?: Types.Maybe<Types.ResourceType>, Project?: Types.Maybe<(
      { __typename?: 'Project' }
      & Project_Fragment
    )> }> };


export const ProjectDocument = gql`
    query project($where: ResourceWhereUniqueInput!) {
  object: resource(where: $where) {
    id
    name
    uri
    type
    Project {
      ...project_
    }
  }
}
    ${Project_FragmentDoc}`;

/**
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProjectQuery(baseOptions: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
        return Apollo.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, baseOptions);
      }
export function useProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
          return Apollo.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, baseOptions);
        }
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectQueryResult = Apollo.QueryResult<ProjectQuery, ProjectQueryVariables>;