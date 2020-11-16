/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { CommentsConnectionCommentUserFragment } from './commentsConnectionCommentUser';
import { gql } from '@apollo/client';
import { CommentsConnectionCommentUserFragmentDoc } from './commentsConnectionCommentUser';
export type CommentsConnectionCommentFragment = { __typename?: 'Resource', id: string, createdAt: any, updatedAt: any, type?: Types.Maybe<Types.ResourceType>, contentText?: Types.Maybe<string>, CreatedBy: (
    { __typename?: 'User' }
    & CommentsConnectionCommentUserFragment
  ) };

export const CommentsConnectionCommentFragmentDoc = gql`
    fragment commentsConnectionComment on Resource {
  id
  createdAt
  updatedAt
  type
  contentText
  CreatedBy {
    ...commentsConnectionCommentUser
  }
}
    ${CommentsConnectionCommentUserFragmentDoc}`;