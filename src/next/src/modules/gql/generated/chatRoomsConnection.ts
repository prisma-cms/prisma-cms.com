/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { ChatRoomsConnectionChatRoomFragment } from './chatRoomsConnectionChatRoom';
import { gql } from '@apollo/client';
import { ChatRoomsConnectionChatRoomFragmentDoc } from './chatRoomsConnectionChatRoom';
import * as Apollo from '@apollo/client';
export type ChatRoomsConnectionQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.ChatRoomWhereInput>;
  orderBy?: Types.Maybe<Types.ChatRoomOrderByInput>;
  skip?: Types.Maybe<Types.Scalars['Int']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  before?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
}>;


export type ChatRoomsConnectionQuery = { __typename?: 'Query', objectsConnection: { __typename?: 'ChatRoomConnection', aggregate: { __typename?: 'AggregateChatRoom', count: number }, edges: Array<Types.Maybe<{ __typename?: 'ChatRoomEdge', node: (
        { __typename?: 'ChatRoom' }
        & ChatRoomsConnectionChatRoomFragment
      ) }>> } };


export const ChatRoomsConnectionDocument = gql`
    query chatRoomsConnection($where: ChatRoomWhereInput, $orderBy: ChatRoomOrderByInput, $skip: Int, $after: String, $before: String, $first: Int = 10, $last: Int) {
  objectsConnection: chatRoomsConnection(
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
        ...chatRoomsConnectionChatRoom
      }
    }
  }
}
    ${ChatRoomsConnectionChatRoomFragmentDoc}`;

/**
 * __useChatRoomsConnectionQuery__
 *
 * To run a query within a React component, call `useChatRoomsConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatRoomsConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatRoomsConnectionQuery({
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
export function useChatRoomsConnectionQuery(baseOptions?: Apollo.QueryHookOptions<ChatRoomsConnectionQuery, ChatRoomsConnectionQueryVariables>) {
        return Apollo.useQuery<ChatRoomsConnectionQuery, ChatRoomsConnectionQueryVariables>(ChatRoomsConnectionDocument, baseOptions);
      }
export function useChatRoomsConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatRoomsConnectionQuery, ChatRoomsConnectionQueryVariables>) {
          return Apollo.useLazyQuery<ChatRoomsConnectionQuery, ChatRoomsConnectionQueryVariables>(ChatRoomsConnectionDocument, baseOptions);
        }
export type ChatRoomsConnectionQueryHookResult = ReturnType<typeof useChatRoomsConnectionQuery>;
export type ChatRoomsConnectionLazyQueryHookResult = ReturnType<typeof useChatRoomsConnectionLazyQuery>;
export type ChatRoomsConnectionQueryResult = Apollo.QueryResult<ChatRoomsConnectionQuery, ChatRoomsConnectionQueryVariables>;