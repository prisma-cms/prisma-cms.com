/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { TopicsConnectionTopicFragment } from './topicsConnectionTopic';
import { TopicsConnectionUserFragment } from './topicsConnectionUser';
import { gql } from '@apollo/client';
import { TopicsConnectionTopicFragmentDoc } from './topicsConnectionTopic';
import { TopicsConnectionUserFragmentDoc } from './topicsConnectionUser';
import * as Apollo from '@apollo/client';
export type TopicsConnectionQueryVariables = Types.Exact<{
  first?: Types.Maybe<Types.Scalars['Int']>;
  skip?: Types.Maybe<Types.Scalars['Int']>;
  where?: Types.Maybe<Types.ResourceWhereInput>;
  orderBy?: Types.Maybe<Types.ResourceOrderByInput>;
}>;


export type TopicsConnectionQuery = { __typename?: 'Query', objectsConnection: { __typename?: 'ResourceConnection', aggregate: { __typename?: 'AggregateResource', count: number }, edges: Array<Types.Maybe<{ __typename?: 'ResourceEdge', node: (
        { __typename?: 'Resource', CreatedBy: (
          { __typename?: 'User' }
          & TopicsConnectionUserFragment
        ), Comments?: Types.Maybe<Array<{ __typename?: 'Resource', id: string, updatedAt: any, CreatedBy: (
            { __typename?: 'User' }
            & TopicsConnectionUserFragment
          ) }>>, Blog?: Types.Maybe<{ __typename?: 'Resource', id: string, name: string, longtitle?: Types.Maybe<string>, uri: string }>, Tags?: Types.Maybe<Array<{ __typename?: 'ResourceTag', Tag: { __typename?: 'Tag', id: string, name: string } }>> }
        & TopicsConnectionTopicFragment
      ) }>> } };


export const TopicsConnectionDocument = gql`
    query topicsConnection($first: Int = 10, $skip: Int, $where: ResourceWhereInput, $orderBy: ResourceOrderByInput = updatedAt_DESC) {
  objectsConnection: resourcesConnection(
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
        ...topicsConnectionTopic
        CreatedBy {
          ...topicsConnectionUser
        }
        Comments(orderBy: id_ASC) {
          id
          updatedAt
          CreatedBy {
            ...topicsConnectionUser
          }
        }
        Blog {
          id
          name
          longtitle
          uri
        }
        Tags {
          Tag {
            id
            name
          }
        }
      }
    }
  }
}
    ${TopicsConnectionTopicFragmentDoc}
${TopicsConnectionUserFragmentDoc}`;

/**
 * __useTopicsConnectionQuery__
 *
 * To run a query within a React component, call `useTopicsConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopicsConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopicsConnectionQuery({
 *   variables: {
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useTopicsConnectionQuery(baseOptions?: Apollo.QueryHookOptions<TopicsConnectionQuery, TopicsConnectionQueryVariables>) {
        return Apollo.useQuery<TopicsConnectionQuery, TopicsConnectionQueryVariables>(TopicsConnectionDocument, baseOptions);
      }
export function useTopicsConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TopicsConnectionQuery, TopicsConnectionQueryVariables>) {
          return Apollo.useLazyQuery<TopicsConnectionQuery, TopicsConnectionQueryVariables>(TopicsConnectionDocument, baseOptions);
        }
export type TopicsConnectionQueryHookResult = ReturnType<typeof useTopicsConnectionQuery>;
export type TopicsConnectionLazyQueryHookResult = ReturnType<typeof useTopicsConnectionLazyQuery>;
export type TopicsConnectionQueryResult = Apollo.QueryResult<TopicsConnectionQuery, TopicsConnectionQueryVariables>;