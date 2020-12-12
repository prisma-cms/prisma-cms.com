/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { TasksConnectionTaskNoNestingFragment } from './tasksConnectionTaskNoNesting';
import { TasksConnectionUserFragment } from './tasksConnectionUser';
import { gql } from '@apollo/client';
import { TasksConnectionTaskNoNestingFragmentDoc } from './tasksConnectionTaskNoNesting';
import { TasksConnectionUserFragmentDoc } from './tasksConnectionUser';
export type TasksConnectionTaskFragment = (
  { __typename?: 'Task', CreatedBy?: Types.Maybe<(
    { __typename?: 'User' }
    & TasksConnectionUserFragment
  )>, Timers?: Types.Maybe<Array<{ __typename?: 'Timer', id: string, createdAt: Date, updatedAt: Date, stopedAt?: Types.Maybe<Date>, CreatedBy?: Types.Maybe<(
      { __typename?: 'User' }
      & TasksConnectionUserFragment
    )>, Task: { __typename?: 'Task', id: string, createdAt: Date, updatedAt: Date, name: string, status: Types.TaskStatus } }>>, TaskProjects?: Types.Maybe<Array<{ __typename?: 'ProjectTask', id: string, createdAt: Date, updatedAt: Date, Project: { __typename?: 'Project', id: string, name: string, domain?: Types.Maybe<string>, createdAt: Date, updatedAt: Date, description?: Types.Maybe<string>, url?: Types.Maybe<string>, sequence?: Types.Maybe<number>, content?: Types.Maybe<Record<string, any> | Array<any>>, contentText?: Types.Maybe<string>, status?: Types.Maybe<Types.ProjectStatus>, public?: Types.Maybe<boolean>, oldID?: Types.Maybe<number>, CreatedBy?: Types.Maybe<(
        { __typename?: 'User' }
        & TasksConnectionUserFragment
      )>, Resource?: Types.Maybe<{ __typename?: 'Resource', id: string, name: string, uri: string }> } }>>, RelatedTo?: Types.Maybe<Array<(
    { __typename?: 'Task' }
    & TasksConnectionTaskNoNestingFragment
  )>>, Reactions?: Types.Maybe<Array<{ __typename?: 'TaskReaction', id: string, createdAt: Date, updatedAt: Date, type?: Types.Maybe<Types.TaskReactionType>, CreatedBy?: Types.Maybe<(
      { __typename?: 'User' }
      & TasksConnectionUserFragment
    )> }>> }
  & TasksConnectionTaskNoNestingFragment
);

export const TasksConnectionTaskFragmentDoc = gql`
    fragment tasksConnectionTask on Task {
  ...tasksConnectionTaskNoNesting
  CreatedBy {
    ...tasksConnectionUser
  }
  Timers(orderBy: createdAt_DESC) {
    id
    createdAt
    updatedAt
    stopedAt
    CreatedBy {
      ...tasksConnectionUser
    }
    Task {
      id
      createdAt
      updatedAt
      name
      status
    }
  }
  TaskProjects {
    id
    createdAt
    updatedAt
    Project {
      id
      name
      domain
      createdAt
      updatedAt
      description
      url
      sequence
      content
      contentText
      status
      public
      oldID
      CreatedBy {
        ...tasksConnectionUser
      }
      Resource {
        id
        name
        uri
      }
    }
  }
  RelatedTo {
    ...tasksConnectionTaskNoNesting
  }
  Reactions {
    id
    createdAt
    updatedAt
    type
    CreatedBy {
      ...tasksConnectionUser
    }
  }
}
    ${TasksConnectionTaskNoNestingFragmentDoc}
${TasksConnectionUserFragmentDoc}`;