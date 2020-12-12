/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { FChatRoomFragment } from './fChatRoom';
import { gql } from '@apollo/client';
import { FChatRoomFragmentDoc } from './fChatRoom';
import * as Apollo from '@apollo/client';
export type ChatRoomQueryVariables = Types.Exact<{
  where: Types.ChatRoomWhereUniqueInput;
}>;


export type ChatRoomQuery = { __typename?: 'Query', object?: Types.Maybe<(
    { __typename?: 'ChatRoom' }
    & FChatRoomFragment
  )> };


export const ChatRoomDocument = gql`
    query chatRoom($where: ChatRoomWhereUniqueInput!) {
  object: chatRoom(where: $where) {
    ...fChatRoom
  }
}
    ${FChatRoomFragmentDoc}`;

/**
 * __useChatRoomQuery__
 *
 * To run a query within a React component, call `useChatRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatRoomQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useChatRoomQuery(baseOptions: Apollo.QueryHookOptions<ChatRoomQuery, ChatRoomQueryVariables>) {
        return Apollo.useQuery<ChatRoomQuery, ChatRoomQueryVariables>(ChatRoomDocument, baseOptions);
      }
export function useChatRoomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatRoomQuery, ChatRoomQueryVariables>) {
          return Apollo.useLazyQuery<ChatRoomQuery, ChatRoomQueryVariables>(ChatRoomDocument, baseOptions);
        }
export type ChatRoomQueryHookResult = ReturnType<typeof useChatRoomQuery>;
export type ChatRoomLazyQueryHookResult = ReturnType<typeof useChatRoomLazyQuery>;
export type ChatRoomQueryResult = Apollo.QueryResult<ChatRoomQuery, ChatRoomQueryVariables>;