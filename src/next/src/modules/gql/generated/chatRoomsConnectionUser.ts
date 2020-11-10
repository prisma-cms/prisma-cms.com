/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { gql } from '@apollo/client';
export type ChatRoomsConnectionUserFragment = { __typename?: 'User', id: string, createdAt: any, updatedAt: any, username?: Types.Maybe<string>, email?: Types.Maybe<string>, phone?: Types.Maybe<string>, showEmail?: Types.Maybe<boolean>, showPhone?: Types.Maybe<boolean>, password?: Types.Maybe<string>, fullname?: Types.Maybe<string>, image?: Types.Maybe<string>, address?: Types.Maybe<string>, sudo?: Types.Maybe<boolean>, active?: Types.Maybe<boolean>, activated?: Types.Maybe<boolean>, deleted?: Types.Maybe<boolean>, hasEmail: boolean, hasPhone: boolean, marketplaceToken?: Types.Maybe<string>, hidden?: Types.Maybe<boolean> };

export const ChatRoomsConnectionUserFragmentDoc = gql`
    fragment chatRoomsConnectionUser on User {
  id
  createdAt
  updatedAt
  username
  email
  phone
  showEmail
  showPhone
  password
  fullname
  image
  address
  sudo
  active
  activated
  deleted
  hasEmail
  hasPhone
  marketplaceToken
  hidden
}
    `;