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
export type ChatMessageQueryVariables = Types.Exact<{
  where: Types.ChatMessageWhereUniqueInput;
}>;


export type ChatMessageQuery = { __typename?: 'Query', object?: Types.Maybe<(
    { __typename?: 'ChatMessage' }
    & ChatMessage_Fragment
  )> };


export const ChatMessageDocument = gql`
    query chatMessage($where: ChatMessageWhereUniqueInput!) {
  object: chatMessage(where: $where) {
    ...chatMessage_
  }
}
    ${ChatMessage_FragmentDoc}`;

/**
 * __useChatMessageQuery__
 *
 * To run a query within a React component, call `useChatMessageQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatMessageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatMessageQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useChatMessageQuery(baseOptions: Apollo.QueryHookOptions<ChatMessageQuery, ChatMessageQueryVariables>) {
        return Apollo.useQuery<ChatMessageQuery, ChatMessageQueryVariables>(ChatMessageDocument, baseOptions);
      }
export function useChatMessageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatMessageQuery, ChatMessageQueryVariables>) {
          return Apollo.useLazyQuery<ChatMessageQuery, ChatMessageQueryVariables>(ChatMessageDocument, baseOptions);
        }
export type ChatMessageQueryHookResult = ReturnType<typeof useChatMessageQuery>;
export type ChatMessageLazyQueryHookResult = ReturnType<typeof useChatMessageLazyQuery>;
export type ChatMessageQueryResult = Apollo.QueryResult<ChatMessageQuery, ChatMessageQueryVariables>;