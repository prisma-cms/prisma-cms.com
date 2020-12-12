/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { gql } from '@apollo/client';
export type NotificationTypeNoNestingFragment = { __typename?: 'NotificationType', id: string, createdAt: Date, updatedAt: Date, name: string, code?: Types.Maybe<string>, comment?: Types.Maybe<string>, oldID?: Types.Maybe<number> };

export const NotificationTypeNoNestingFragmentDoc = gql`
    fragment NotificationTypeNoNesting on NotificationType {
  id
  createdAt
  updatedAt
  name
  code
  comment
  oldID
}
    `;