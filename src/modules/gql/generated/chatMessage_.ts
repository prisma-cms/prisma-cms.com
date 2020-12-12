/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { ChatMessageNoNestingFragment } from './ChatMessageNoNesting';
import { ChatRoomNoNestingFragment } from './ChatRoomNoNesting';
import { UserNoNestingFragment } from './UserNoNesting';
import { gql } from '@apollo/client';
import { ChatMessageNoNestingFragmentDoc } from './ChatMessageNoNesting';
import { ChatRoomNoNestingFragmentDoc } from './ChatRoomNoNesting';
import { UserNoNestingFragmentDoc } from './UserNoNesting';
export type ChatMessage_Fragment = (
  { __typename?: 'ChatMessage', Room?: Types.Maybe<(
    { __typename?: 'ChatRoom' }
    & ChatRoomNoNestingFragment
  )>, CreatedBy?: Types.Maybe<(
    { __typename?: 'User' }
    & UserNoNestingFragment
  )> }
  & ChatMessageNoNestingFragment
);

export const ChatMessage_FragmentDoc = gql`
    fragment chatMessage_ on ChatMessage {
  ...ChatMessageNoNesting
  Room {
    ...ChatRoomNoNesting
  }
  CreatedBy {
    ...UserNoNesting
  }
}
    ${ChatMessageNoNestingFragmentDoc}
${ChatRoomNoNestingFragmentDoc}
${UserNoNestingFragmentDoc}`;