/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { gql } from '@apollo/client';
export type TasksConnectionTaskNoNestingFragment = { __typename?: 'Task', id: string, createdAt: Date, updatedAt: Date, name: string, description?: Types.Maybe<string>, content?: Types.Maybe<Record<string, any> | Array<any>>, status: Types.TaskStatus, startDatePlaning?: Types.Maybe<Date>, endDatePlaning?: Types.Maybe<Date>, startDate?: Types.Maybe<Date>, endDate?: Types.Maybe<Date> };

export const TasksConnectionTaskNoNestingFragmentDoc = gql`
    fragment tasksConnectionTaskNoNesting on Task {
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