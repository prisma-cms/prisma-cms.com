/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { ProjectNoNestingFragment } from './ProjectNoNesting';
import { UserNoNestingFragment } from './UserNoNesting';
import { TaskNoNestingFragment } from './TaskNoNesting';
import { gql } from '@apollo/client';
import { ProjectNoNestingFragmentDoc } from './ProjectNoNesting';
import { UserNoNestingFragmentDoc } from './UserNoNesting';
import { TaskNoNestingFragmentDoc } from './TaskNoNesting';
export type Project_Fragment = (
  { __typename?: 'Project', CreatedBy?: Types.Maybe<(
    { __typename?: 'User' }
    & UserNoNestingFragment
  )>, Members?: Types.Maybe<Array<{ __typename?: 'ProjectMember', id: string, User: (
      { __typename?: 'User' }
      & UserNoNestingFragment
    ) }>>, ProjectTasks?: Types.Maybe<Array<{ __typename?: 'ProjectTask', id: string, createdAt: Date, updatedAt: Date, Task: (
      { __typename?: 'Task', CreatedBy?: Types.Maybe<(
        { __typename?: 'User' }
        & UserNoNestingFragment
        & UserNoNestingFragment
      )>, Timers?: Types.Maybe<Array<{ __typename?: 'Timer', id: string, createdAt: Date, updatedAt: Date, stopedAt?: Types.Maybe<Date>, CreatedBy?: Types.Maybe<(
          { __typename?: 'User' }
          & UserNoNestingFragment
        )> }>>, Parent?: Types.Maybe<(
        { __typename?: 'Task' }
        & TaskNoNestingFragment
      )> }
      & TaskNoNestingFragment
    ) }>>, Resource?: Types.Maybe<{ __typename?: 'Resource', id: string, uri: string, Image?: Types.Maybe<{ __typename?: 'File', id: string, path: string }> }> }
  & ProjectNoNestingFragment
);

export const Project_FragmentDoc = gql`
    fragment project_ on Project {
  ...ProjectNoNesting
  CreatedBy {
    ...UserNoNesting
  }
  Members {
    id
    User {
      ...UserNoNesting
    }
  }
  ProjectTasks {
    id
    createdAt
    updatedAt
    Task {
      ...TaskNoNesting
      CreatedBy {
        ...UserNoNesting
        ...UserNoNesting
      }
      Timers(where: {stopedAt: null}) {
        id
        createdAt
        updatedAt
        stopedAt
        CreatedBy {
          ...UserNoNesting
        }
      }
      CreatedBy {
        ...UserNoNesting
      }
      Parent {
        ...TaskNoNesting
      }
    }
  }
  Resource {
    id
    uri
    Image {
      id
      path
    }
  }
}
    ${ProjectNoNestingFragmentDoc}
${UserNoNestingFragmentDoc}
${TaskNoNestingFragmentDoc}`;