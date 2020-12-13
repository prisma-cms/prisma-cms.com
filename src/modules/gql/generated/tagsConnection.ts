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
export type TagsConnectionQueryVariables = Types.Exact<{
  first: Types.Scalars['Int'];
  skip?: Types.Maybe<Types.Scalars['Int']>;
  where?: Types.Maybe<Types.TagWhereInput>;
  orderBy?: Types.Maybe<Types.TagOrderByInput>;
}>;


export type TagsConnectionQuery = { __typename?: 'Query', tagsConnection: { __typename?: 'TagConnection', aggregate: { __typename?: 'AggregateTag', count: number }, edges: Array<Types.Maybe<{ __typename?: 'TagEdge', node: (
        { __typename?: 'Tag' }
        & Tag_Fragment
      ) }>> } };


export const TagsConnectionDocument = gql`
    query tagsConnection($first: Int!, $skip: Int, $where: TagWhereInput, $orderBy: TagOrderByInput) {
  tagsConnection(first: $first, skip: $skip, where: $where, orderBy: $orderBy) {
    aggregate {
      count
    }
    edges {
      node {
        ...tag_
      }
    }
  }
}
    ${Tag_FragmentDoc}`;

/**
 * __useTagsConnectionQuery__
 *
 * To run a query within a React component, call `useTagsConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagsConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagsConnectionQuery({
 *   variables: {
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useTagsConnectionQuery(baseOptions: Apollo.QueryHookOptions<TagsConnectionQuery, TagsConnectionQueryVariables>) {
        return Apollo.useQuery<TagsConnectionQuery, TagsConnectionQueryVariables>(TagsConnectionDocument, baseOptions);
      }
export function useTagsConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagsConnectionQuery, TagsConnectionQueryVariables>) {
          return Apollo.useLazyQuery<TagsConnectionQuery, TagsConnectionQueryVariables>(TagsConnectionDocument, baseOptions);
        }
export type TagsConnectionQueryHookResult = ReturnType<typeof useTagsConnectionQuery>;
export type TagsConnectionLazyQueryHookResult = ReturnType<typeof useTagsConnectionLazyQuery>;
export type TagsConnectionQueryResult = Apollo.QueryResult<TagsConnectionQuery, TagsConnectionQueryVariables>;