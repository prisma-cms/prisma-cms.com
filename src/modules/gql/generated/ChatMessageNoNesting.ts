/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { gql } from '@apollo/client';
export type ChatMessageNoNestingFragment = { __typename?: 'ChatMessage', id: string, createdAt: Date, updatedAt: Date, content?: Types.Maybe<Record<string, any> | Array<any>>, contentText?: Types.Maybe<string> };

export const ChatMessageNoNestingFragmentDoc = gql`
    fragment ChatMessageNoNesting on ChatMessage {
  id
  createdAt
  updatedAt
  content
  contentText
}
    `;