/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { ChatMessage_Fragment } from './chatMessage_';
import { gql } from '@apollo/client';
import { ChatMessage_FragmentDoc } from './chatMessage_';
import * as Apollo from '@apollo/client';
export type ChatMessagesConnectionQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.ChatMessageWhereInput>;
  orderBy?: Types.Maybe<Types.ChatMessageOrderByInput>;
  skip?: Types.Maybe<Types.Scalars['Int']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  before?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
}>;


export type ChatMessagesConnectionQuery = { __typename?: 'Query', objectsConnection: { __typename?: 'ChatMessageConnection', aggregate: { __typename?: 'AggregateChatMessage', count: number }, edges: Array<Types.Maybe<{ __typename?: 'ChatMessageEdge', node: (
        { __typename?: 'ChatMessage' }
        & ChatMessage_Fragment
      ) }>> } };


export const ChatMessagesConnectionDocument = gql`
    query chatMessagesConnection($where: ChatMessageWhereInput, $orderBy: ChatMessageOrderByInput, $skip: Int, $after: String, $before: String, $first: Int = 10, $last: Int) {
  objectsConnection: chatMessagesConnection(
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
        ...chatMessage_
      }
    }
  }
}
    ${ChatMessage_FragmentDoc}`;

/**
 * __useChatMessagesConnectionQuery__
 *
 * To run a query within a React component, call `useChatMessagesConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatMessagesConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatMessagesConnectionQuery({
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
export function useChatMessagesConnectionQuery(baseOptions?: Apollo.QueryHookOptions<ChatMessagesConnectionQuery, ChatMessagesConnectionQueryVariables>) {
        return Apollo.useQuery<ChatMessagesConnectionQuery, ChatMessagesConnectionQueryVariables>(ChatMessagesConnectionDocument, baseOptions);
      }
export function useChatMessagesConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatMessagesConnectionQuery, ChatMessagesConnectionQueryVariables>) {
          return Apollo.useLazyQuery<ChatMessagesConnectionQuery, ChatMessagesConnectionQueryVariables>(ChatMessagesConnectionDocument, baseOptions);
        }
export type ChatMessagesConnectionQueryHookResult = ReturnType<typeof useChatMessagesConnectionQuery>;
export type ChatMessagesConnectionLazyQueryHookResult = ReturnType<typeof useChatMessagesConnectionLazyQuery>;
export type ChatMessagesConnectionQueryResult = Apollo.QueryResult<ChatMessagesConnectionQuery, ChatMessagesConnectionQueryVariables>;