/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { gql } from '@apollo/client';
export type AuthFormUsersConnectionUserFragment = { __typename?: 'User', id: string, username?: Types.Maybe<string>, fullname?: Types.Maybe<string>, email?: Types.Maybe<string>, image?: Types.Maybe<string> };

export const AuthFormUsersConnectionUserFragmentDoc = gql`
    fragment AuthFormUsersConnectionUser on User {
  id
  username
  fullname
  email
  image
}
    `;