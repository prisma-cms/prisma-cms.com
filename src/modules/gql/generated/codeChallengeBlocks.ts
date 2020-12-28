/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { CodeChallengeBlocksBlockFragment } from './codeChallengeBlocksBlock';
import { gql } from '@apollo/client';
import { CodeChallengeBlocksBlockFragmentDoc } from './codeChallengeBlocksBlock';
import * as Apollo from '@apollo/client';
export type CodeChallengeBlocksQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.CodeChallengeBlockWhereInput>;
  orderBy?: Types.Maybe<Types.CodeChallengeBlockOrderByInput>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  skip?: Types.Maybe<Types.Scalars['Int']>;
}>;


export type CodeChallengeBlocksQuery = { __typename?: 'Query', codeChallengeBlocks: Array<Types.Maybe<(
    { __typename?: 'CodeChallengeBlock' }
    & CodeChallengeBlocksBlockFragment
  )>> };


export const CodeChallengeBlocksDocument = gql`
    query codeChallengeBlocks($where: CodeChallengeBlockWhereInput = {Parent: null}, $orderBy: CodeChallengeBlockOrderByInput = rank_ASC, $first: Int, $skip: Int) {
  codeChallengeBlocks(
    where: $where
    orderBy: $orderBy
    first: $first
    skip: $skip
  ) {
    ...codeChallengeBlocksBlock
  }
}
    ${CodeChallengeBlocksBlockFragmentDoc}`;

/**
 * __useCodeChallengeBlocksQuery__
 *
 * To run a query within a React component, call `useCodeChallengeBlocksQuery` and pass it any options that fit your needs.
 * When your component renders, `useCodeChallengeBlocksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCodeChallengeBlocksQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useCodeChallengeBlocksQuery(baseOptions?: Apollo.QueryHookOptions<CodeChallengeBlocksQuery, CodeChallengeBlocksQueryVariables>) {
        return Apollo.useQuery<CodeChallengeBlocksQuery, CodeChallengeBlocksQueryVariables>(CodeChallengeBlocksDocument, baseOptions);
      }
export function useCodeChallengeBlocksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CodeChallengeBlocksQuery, CodeChallengeBlocksQueryVariables>) {
          return Apollo.useLazyQuery<CodeChallengeBlocksQuery, CodeChallengeBlocksQueryVariables>(CodeChallengeBlocksDocument, baseOptions);
        }
export type CodeChallengeBlocksQueryHookResult = ReturnType<typeof useCodeChallengeBlocksQuery>;
export type CodeChallengeBlocksLazyQueryHookResult = ReturnType<typeof useCodeChallengeBlocksLazyQuery>;
export type CodeChallengeBlocksQueryResult = Apollo.QueryResult<CodeChallengeBlocksQuery, CodeChallengeBlocksQueryVariables>;