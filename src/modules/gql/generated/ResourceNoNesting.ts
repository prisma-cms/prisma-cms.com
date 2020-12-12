/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { gql } from '@apollo/client';
export type ResourceNoNestingFragment = { __typename?: 'Resource', id: string, createdAt: Date, updatedAt: Date, type?: Types.Maybe<Types.ResourceType>, name: string, longtitle?: Types.Maybe<string>, content?: Types.Maybe<Record<string, any> | Array<any>>, components?: Types.Maybe<Record<string, any> | Array<any>>, contentText?: Types.Maybe<string>, published: boolean, deleted: boolean, hidemenu: boolean, searchable: boolean, uri: string, isfolder: boolean, rating?: Types.Maybe<number>, positiveVotesCount?: Types.Maybe<number>, negativeVotesCount?: Types.Maybe<number>, neutralVotesCount?: Types.Maybe<number>, oldID?: Types.Maybe<number>, commentOldID?: Types.Maybe<number>, class_key?: Types.Maybe<string>, template?: Types.Maybe<number>, mockUpdate?: Types.Maybe<Date> };

export const ResourceNoNestingFragmentDoc = gql`
    fragment ResourceNoNesting on Resource {
  id
  createdAt
  updatedAt
  type
  name
  longtitle
  content
  components
  contentText
  published
  deleted
  hidemenu
  searchable
  uri
  isfolder
  rating
  positiveVotesCount
  negativeVotesCount
  neutralVotesCount
  oldID
  commentOldID
  class_key
  template
  mockUpdate
}
    `;