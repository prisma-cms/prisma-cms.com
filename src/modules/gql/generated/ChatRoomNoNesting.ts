/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { gql } from '@apollo/client';
export type ChatRoomNoNestingFragment = { __typename?: 'ChatRoom', id: string, createdAt: Date, updatedAt: Date, name: string, description?: Types.Maybe<string>, image?: Types.Maybe<string>, code?: Types.Maybe<string>, isPublic?: Types.Maybe<boolean> };

export const ChatRoomNoNestingFragmentDoc = gql`
    fragment ChatRoomNoNesting on ChatRoom {
  id
  createdAt
  updatedAt
  name
  description
  image
  code
  isPublic
}
    `;