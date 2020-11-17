/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { gql } from '@apollo/client';
export type TopicUserFragment = { __typename?: 'User', id: string, createdAt: Date, updatedAt: Date, username?: Types.Maybe<string>, email?: Types.Maybe<string>, phone?: Types.Maybe<string>, showEmail?: Types.Maybe<boolean>, showPhone?: Types.Maybe<boolean>, fullname?: Types.Maybe<string>, image?: Types.Maybe<string>, address?: Types.Maybe<string>, sudo?: Types.Maybe<boolean>, active?: Types.Maybe<boolean>, activated?: Types.Maybe<boolean>, deleted?: Types.Maybe<boolean>, hasEmail: boolean, hasPhone: boolean, hidden?: Types.Maybe<boolean> };

export const TopicUserFragmentDoc = gql`
    fragment topicUser on User {
  id
  createdAt
  updatedAt
  username
  email
  phone
  showEmail
  showPhone
  fullname
  image
  address
  sudo
  active
  activated
  deleted
  hasEmail
  hasPhone
  hidden
}
    `;