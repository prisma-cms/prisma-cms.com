/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { gql } from '@apollo/client';
export type TaskNoNestingFragment = { __typename?: 'Task', id: string, createdAt: any, updatedAt: any, name: string, description?: Types.Maybe<string>, content?: Types.Maybe<any>, status: Types.TaskStatus, startDatePlaning?: Types.Maybe<any>, endDatePlaning?: Types.Maybe<any>, startDate?: Types.Maybe<any>, endDate?: Types.Maybe<any> };

export const TaskNoNestingFragmentDoc = gql`
    fragment TaskNoNesting on Task {
  id
  createdAt
  updatedAt
  name
  description
  content
  status
  startDatePlaning
  endDatePlaning
  startDate
  endDate
}
    `;