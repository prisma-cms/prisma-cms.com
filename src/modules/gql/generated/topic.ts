/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { TopicObjectFragment } from './topicObject';
import { gql } from '@apollo/client';
import { TopicObjectFragmentDoc } from './topicObject';
import * as Apollo from '@apollo/client';
export type TopicQueryVariables = Types.Exact<{
  where: Types.ResourceWhereUniqueInput;
}>;


export type TopicQuery = { __typename?: 'Query', object?: Types.Maybe<(
    { __typename?: 'Resource' }
    & TopicObjectFragment
  )> };


export const TopicDocument = gql`
    query topic($where: ResourceWhereUniqueInput!) {
  object: resource(where: $where) {
    ...topicObject
  }
}
    ${TopicObjectFragmentDoc}`;

/**
 * __useTopicQuery__
 *
 * To run a query within a React component, call `useTopicQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopicQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useTopicQuery(baseOptions: Apollo.QueryHookOptions<TopicQuery, TopicQueryVariables>) {
        return Apollo.useQuery<TopicQuery, TopicQueryVariables>(TopicDocument, baseOptions);
      }
export function useTopicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TopicQuery, TopicQueryVariables>) {
          return Apollo.useLazyQuery<TopicQuery, TopicQueryVariables>(TopicDocument, baseOptions);
        }
export type TopicQueryHookResult = ReturnType<typeof useTopicQuery>;
export type TopicLazyQueryHookResult = ReturnType<typeof useTopicLazyQuery>;
export type TopicQueryResult = Apollo.QueryResult<TopicQuery, TopicQueryVariables>;