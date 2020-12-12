/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { gql } from '@apollo/client';
export type TaskReactionNoNestingFragment = { __typename?: 'TaskReaction', id: string, createdAt: Date, updatedAt: Date, type?: Types.Maybe<Types.TaskReactionType> };

export const TaskReactionNoNestingFragmentDoc = gql`
    fragment TaskReactionNoNesting on TaskReaction {
  id
  createdAt
  updatedAt
  type
}
    `;