/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { gql } from '@apollo/client';
export type UsersConnectionProjectFragment = { __typename?: 'Project', id: string, name: string, domain?: Types.Maybe<string>, createdAt: any, updatedAt: any, description?: Types.Maybe<string>, url?: Types.Maybe<string>, sequence?: Types.Maybe<number>, content?: Types.Maybe<any>, contentText?: Types.Maybe<string>, status?: Types.Maybe<Types.ProjectStatus>, public?: Types.Maybe<boolean>, oldID?: Types.Maybe<number> };

export const UsersConnectionProjectFragmentDoc = gql`
    fragment usersConnectionProject on Project {
  id
  name
  domain
  createdAt
  updatedAt
  description
  url
  sequence
  content
  contentText
  status
  public
  oldID
}
    `;