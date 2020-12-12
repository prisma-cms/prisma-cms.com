/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { gql } from '@apollo/client';
export type TopicsConnectionUserFragment = { __typename?: 'User', id: string, username?: Types.Maybe<string>, fullname?: Types.Maybe<string>, image?: Types.Maybe<string> };

export const TopicsConnectionUserFragmentDoc = gql`
    fragment topicsConnectionUser on User {
  id
  username
  fullname
  image
}
    `;