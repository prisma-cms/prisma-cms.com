/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { ChatRoomsConnectionUserFragment } from './chatRoomsConnectionUser';
import { gql } from '@apollo/client';
import { ChatRoomsConnectionUserFragmentDoc } from './chatRoomsConnectionUser';
export type ChatRoomsConnectionChatRoomFragment = { __typename?: 'ChatRoom', id: string, createdAt: Date, updatedAt: Date, name: string, description?: Types.Maybe<string>, image?: Types.Maybe<string>, code?: Types.Maybe<string>, isPublic?: Types.Maybe<boolean>, CreatedBy: (
    { __typename?: 'User' }
    & ChatRoomsConnectionUserFragment
  ), Members?: Types.Maybe<Array<(
    { __typename?: 'User' }
    & ChatRoomsConnectionUserFragment
  )>>, Invitations?: Types.Maybe<Array<{ __typename?: 'ChatRoomInvitation', id: string, createdAt: Date, updatedAt: Date, User: (
      { __typename?: 'User' }
      & ChatRoomsConnectionUserFragment
    ) }>> };

export const ChatRoomsConnectionChatRoomFragmentDoc = gql`
    fragment chatRoomsConnectionChatRoom on ChatRoom {
  id
  createdAt
  updatedAt
  name
  description
  image
  code
  isPublic
  CreatedBy {
    ...chatRoomsConnectionUser
  }
  Members {
    ...chatRoomsConnectionUser
  }
  Invitations {
    id
    createdAt
    updatedAt
    User {
      ...chatRoomsConnectionUser
    }
  }
}
    ${ChatRoomsConnectionUserFragmentDoc}`;