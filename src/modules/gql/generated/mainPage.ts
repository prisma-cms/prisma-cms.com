/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { UserNoNestingFragment } from './UserNoNesting';
import { MainPageCodeChallengeCompletionFragment } from './mainPageCodeChallengeCompletion';
import { Resource_Fragment } from './resource_';
import { gql } from '@apollo/client';
import { UserNoNestingFragmentDoc } from './UserNoNesting';
import { MainPageCodeChallengeCompletionFragmentDoc } from './mainPageCodeChallengeCompletion';
import { Resource_FragmentDoc } from './resource_';
import * as Apollo from '@apollo/client';
export type MainPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MainPageQuery = { __typename?: 'Query', students: Array<Types.Maybe<(
    { __typename?: 'User' }
    & UserNoNestingFragment
  )>>, codeChallengeCompletions: Array<Types.Maybe<(
    { __typename?: 'CodeChallengeCompletion' }
    & MainPageCodeChallengeCompletionFragment
  )>>, comments: Array<Types.Maybe<(
    { __typename?: 'Resource' }
    & Resource_Fragment
  )>> };


export const MainPageDocument = gql`
    query mainPage {
  students: users(
    first: 4
    orderBy: updatedAt_DESC
    where: {ProjectsCreated_some: {type: Education}}
  ) {
    ...UserNoNesting
  }
  codeChallengeCompletions(
    orderBy: createdAt_DESC
    first: 3
    where: {Task: {status: Completed}}
  ) {
    ...mainPageCodeChallengeCompletion
  }
  comments: resources(first: 5, orderBy: createdAt_DESC, where: {type: Comment}) {
    ...resource_
  }
}
    ${UserNoNestingFragmentDoc}
${MainPageCodeChallengeCompletionFragmentDoc}
${Resource_FragmentDoc}`;

/**
 * __useMainPageQuery__
 *
 * To run a query within a React component, call `useMainPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useMainPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMainPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useMainPageQuery(baseOptions?: Apollo.QueryHookOptions<MainPageQuery, MainPageQueryVariables>) {
        return Apollo.useQuery<MainPageQuery, MainPageQueryVariables>(MainPageDocument, baseOptions);
      }
export function useMainPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MainPageQuery, MainPageQueryVariables>) {
          return Apollo.useLazyQuery<MainPageQuery, MainPageQueryVariables>(MainPageDocument, baseOptions);
        }
export type MainPageQueryHookResult = ReturnType<typeof useMainPageQuery>;
export type MainPageLazyQueryHookResult = ReturnType<typeof useMainPageLazyQuery>;
export type MainPageQueryResult = Apollo.QueryResult<MainPageQuery, MainPageQueryVariables>;