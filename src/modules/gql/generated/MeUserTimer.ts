/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { gql } from '@apollo/client';
export type MeUserTimerFragment = { __typename?: 'Timer', id: string, createdAt: Date, stopedAt?: Types.Maybe<Date>, Task: { __typename?: 'Task', id: string, name: string, status: Types.TaskStatus, TaskProjects?: Types.Maybe<Array<{ __typename?: 'ProjectTask', id: string, createdAt: Date, updatedAt: Date, Project: { __typename?: 'Project', id: string, type?: Types.Maybe<Types.ProjectType>, name: string } }>> } };

export const MeUserTimerFragmentDoc = gql`
    fragment MeUserTimer on Timer {
  id
  createdAt
  stopedAt
  Task {
    id
    name
    status
    TaskProjects {
      id
      createdAt
      updatedAt
      Project {
        id
        type
        name
      }
    }
  }
}
    `;