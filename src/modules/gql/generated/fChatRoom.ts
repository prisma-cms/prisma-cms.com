/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { ChatRoomNoNestingFragment } from './ChatRoomNoNesting';
import { UserNoNestingFragment } from './UserNoNesting';
import { gql } from '@apollo/client';
import { ChatRoomNoNestingFragmentDoc } from './ChatRoomNoNesting';
import { UserNoNestingFragmentDoc } from './UserNoNesting';
export type FChatRoomFragment = (
  { __typename?: 'ChatRoom', CreatedBy: (
    { __typename?: 'User' }
    & UserNoNestingFragment
  ), Members?: Types.Maybe<Array<(
    { __typename?: 'User' }
    & UserNoNestingFragment
  )>>, Invitations?: Types.Maybe<Array<{ __typename?: 'ChatRoomInvitation', id: string, createdAt: Date, updatedAt: Date, User: (
      { __typename?: 'User' }
      & UserNoNestingFragment
    ) }>>, Messages?: Types.Maybe<Array<{ __typename?: 'ChatMessage', id: string, createdAt: Date, updatedAt: Date, content?: Types.Maybe<Record<string, any> | Array<any>>, CreatedBy?: Types.Maybe<(
      { __typename?: 'User' }
      & UserNoNestingFragment
    )> }>> }
  & ChatRoomNoNestingFragment
);

export const FChatRoomFragmentDoc = gql`
    fragment fChatRoom on ChatRoom {
  ...ChatRoomNoNesting
  CreatedBy {
    ...UserNoNesting
  }
  Members {
    ...UserNoNesting
  }
  Invitations {
    id
    createdAt
    updatedAt
    User {
      ...UserNoNesting
    }
  }
  Messages {
    id
    createdAt
    updatedAt
    content
    CreatedBy {
      ...UserNoNesting
    }
  }
}
    ${ChatRoomNoNestingFragmentDoc}
${UserNoNestingFragmentDoc}`;