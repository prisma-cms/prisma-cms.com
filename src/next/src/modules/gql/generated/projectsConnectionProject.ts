/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { ProjectNoNestingFragment } from './ProjectNoNesting';
import { ProjectsConnectionUserFragment } from './projectsConnectionUser';
import { TaskNoNestingFragment } from './TaskNoNesting';
import { gql } from '@apollo/client';
import { ProjectNoNestingFragmentDoc } from './ProjectNoNesting';
import { ProjectsConnectionUserFragmentDoc } from './projectsConnectionUser';
import { TaskNoNestingFragmentDoc } from './TaskNoNesting';
export type ProjectsConnectionProjectFragment = (
  { __typename?: 'Project', CreatedBy?: Types.Maybe<(
    { __typename?: 'User' }
    & ProjectsConnectionUserFragment
  )>, Members?: Types.Maybe<Array<{ __typename?: 'ProjectMember', id: string, User: (
      { __typename?: 'User' }
      & ProjectsConnectionUserFragment
    ) }>>, ProjectTasks?: Types.Maybe<Array<{ __typename?: 'ProjectTask', id: string, createdAt: any, updatedAt: any, Task: (
      { __typename?: 'Task', CreatedBy?: Types.Maybe<(
        { __typename?: 'User' }
        & ProjectsConnectionUserFragment
        & ProjectsConnectionUserFragment
      )>, Timers?: Types.Maybe<Array<{ __typename?: 'Timer', id: string, createdAt: any, updatedAt: any, stopedAt?: Types.Maybe<any>, CreatedBy?: Types.Maybe<(
          { __typename?: 'User' }
          & ProjectsConnectionUserFragment
        )> }>>, Parent?: Types.Maybe<(
        { __typename?: 'Task' }
        & TaskNoNestingFragment
      )> }
      & TaskNoNestingFragment
    ) }>>, Resource?: Types.Maybe<{ __typename?: 'Resource', id: string, uri: string, Image?: Types.Maybe<{ __typename?: 'File', id: string, path: string }> }> }
  & ProjectNoNestingFragment
);

export const ProjectsConnectionProjectFragmentDoc = gql`
    fragment projectsConnectionProject on Project {
  ...ProjectNoNesting
  CreatedBy {
    ...projectsConnectionUser
  }
  Members {
    id
    User {
      ...projectsConnectionUser
    }
  }
  ProjectTasks {
    id
    createdAt
    updatedAt
    Task {
      ...TaskNoNesting
      CreatedBy {
        ...projectsConnectionUser
        ...projectsConnectionUser
      }
      Timers(where: {stopedAt: null}) {
        id
        createdAt
        updatedAt
        stopedAt
        CreatedBy {
          ...projectsConnectionUser
        }
      }
      CreatedBy {
        ...projectsConnectionUser
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
${ProjectsConnectionUserFragmentDoc}
${TaskNoNestingFragmentDoc}`;