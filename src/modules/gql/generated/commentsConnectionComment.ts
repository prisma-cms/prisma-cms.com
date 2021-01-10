/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { CommentsConnectionCommentUserFragment } from './commentsConnectionCommentUser';
import { gql } from '@apollo/client';
import { CommentsConnectionCommentUserFragmentDoc } from './commentsConnectionCommentUser';
export type CommentsConnectionCommentFragment = { __typename?: 'Resource', id: string, createdAt: Date, updatedAt: Date, type?: Types.Maybe<Types.ResourceType>, content?: Types.Maybe<Record<string, any> | Array<any>>, uri: string, CreatedBy: (
    { __typename?: 'User' }
    & CommentsConnectionCommentUserFragment
  ), Topic?: Types.Maybe<{ __typename?: 'Resource', id: string, name: string, uri: string, type?: Types.Maybe<Types.ResourceType> }> };

export const CommentsConnectionCommentFragmentDoc = gql`
    fragment commentsConnectionComment on Resource {
  id
  createdAt
  updatedAt
  type
  content
  uri
  CreatedBy {
    ...commentsConnectionCommentUser
  }
  Topic {
    id
    name
    uri
    type
  }
}
    ${CommentsConnectionCommentUserFragmentDoc}`;