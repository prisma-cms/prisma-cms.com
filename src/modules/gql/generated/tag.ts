/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { Tag_Fragment } from './tag_';
import { gql } from '@apollo/client';
import { Tag_FragmentDoc } from './tag_';
import * as Apollo from '@apollo/client';
export type TagQueryVariables = Types.Exact<{
  where: Types.TagWhereUniqueInput;
}>;


export type TagQuery = { __typename?: 'Query', object?: Types.Maybe<(
    { __typename?: 'Tag' }
    & Tag_Fragment
  )> };


export const TagDocument = gql`
    query tag($where: TagWhereUniqueInput!) {
  object: tag(where: $where) {
    ...tag_
  }
}
    ${Tag_FragmentDoc}`;

/**
 * __useTagQuery__
 *
 * To run a query within a React component, call `useTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useTagQuery(baseOptions: Apollo.QueryHookOptions<TagQuery, TagQueryVariables>) {
        return Apollo.useQuery<TagQuery, TagQueryVariables>(TagDocument, baseOptions);
      }
export function useTagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagQuery, TagQueryVariables>) {
          return Apollo.useLazyQuery<TagQuery, TagQueryVariables>(TagDocument, baseOptions);
        }
export type TagQueryHookResult = ReturnType<typeof useTagQuery>;
export type TagLazyQueryHookResult = ReturnType<typeof useTagLazyQuery>;
export type TagQueryResult = Apollo.QueryResult<TagQuery, TagQueryVariables>;