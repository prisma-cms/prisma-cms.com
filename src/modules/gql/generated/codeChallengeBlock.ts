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
export type CodeChallengeBlockQueryVariables = Types.Exact<{
  where: Types.CodeChallengeBlockWhereUniqueInput;
}>;


export type CodeChallengeBlockQuery = { __typename?: 'Query', object?: Types.Maybe<(
    { __typename?: 'CodeChallengeBlock' }
    & CodeChallengeBlocksBlockFragment
  )> };


export const CodeChallengeBlockDocument = gql`
    query codeChallengeBlock($where: CodeChallengeBlockWhereUniqueInput!) {
  object: codeChallengeBlock(where: $where) {
    ...codeChallengeBlocksBlock
  }
}
    ${CodeChallengeBlocksBlockFragmentDoc}`;

/**
 * __useCodeChallengeBlockQuery__
 *
 * To run a query within a React component, call `useCodeChallengeBlockQuery` and pass it any options that fit your needs.
 * When your component renders, `useCodeChallengeBlockQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCodeChallengeBlockQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useCodeChallengeBlockQuery(baseOptions: Apollo.QueryHookOptions<CodeChallengeBlockQuery, CodeChallengeBlockQueryVariables>) {
        return Apollo.useQuery<CodeChallengeBlockQuery, CodeChallengeBlockQueryVariables>(CodeChallengeBlockDocument, baseOptions);
      }
export function useCodeChallengeBlockLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CodeChallengeBlockQuery, CodeChallengeBlockQueryVariables>) {
          return Apollo.useLazyQuery<CodeChallengeBlockQuery, CodeChallengeBlockQueryVariables>(CodeChallengeBlockDocument, baseOptions);
        }
export type CodeChallengeBlockQueryHookResult = ReturnType<typeof useCodeChallengeBlockQuery>;
export type CodeChallengeBlockLazyQueryHookResult = ReturnType<typeof useCodeChallengeBlockLazyQuery>;
export type CodeChallengeBlockQueryResult = Apollo.QueryResult<CodeChallengeBlockQuery, CodeChallengeBlockQueryVariables>;