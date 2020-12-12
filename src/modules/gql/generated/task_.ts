/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { TaskNoNestingFragment } from './TaskNoNesting';
import { UserNoNestingFragment } from './UserNoNesting';
import { TimerNoNestingFragment } from './TimerNoNesting';
import { ProjectNoNestingFragment } from './ProjectNoNesting';
import { TaskReactionNoNestingFragment } from './TaskReactionNoNesting';
import { gql } from '@apollo/client';
import { TaskNoNestingFragmentDoc } from './TaskNoNesting';
import { UserNoNestingFragmentDoc } from './UserNoNesting';
import { TimerNoNestingFragmentDoc } from './TimerNoNesting';
import { ProjectNoNestingFragmentDoc } from './ProjectNoNesting';
import { TaskReactionNoNestingFragmentDoc } from './TaskReactionNoNesting';
export type Task_Fragment = (
  { __typename?: 'Task', CreatedBy?: Types.Maybe<(
    { __typename?: 'User' }
    & UserNoNestingFragment
  )>, Timers?: Types.Maybe<Array<(
    { __typename?: 'Timer', CreatedBy?: Types.Maybe<(
      { __typename?: 'User' }
      & UserNoNestingFragment
    )> }
    & TimerNoNestingFragment
  )>>, TaskProjects?: Types.Maybe<Array<{ __typename?: 'ProjectTask', id: string, createdAt: Date, updatedAt: Date, Project: (
      { __typename?: 'Project', CreatedBy?: Types.Maybe<(
        { __typename?: 'User' }
        & UserNoNestingFragment
      )>, Resource?: Types.Maybe<{ __typename?: 'Resource', id: string, name: string, uri: string }> }
      & ProjectNoNestingFragment
    ) }>>, RelatedTo?: Types.Maybe<Array<(
    { __typename?: 'Task' }
    & TaskNoNestingFragment
  )>>, Reactions?: Types.Maybe<Array<(
    { __typename?: 'TaskReaction', CreatedBy?: Types.Maybe<(
      { __typename?: 'User' }
      & UserNoNestingFragment
    )> }
    & TaskReactionNoNestingFragment
  )>> }
  & TaskNoNestingFragment
);

export const Task_FragmentDoc = gql`
    fragment task_ on Task {
  ...TaskNoNesting
  CreatedBy {
    ...UserNoNesting
  }
  Timers(orderBy: createdAt_DESC) {
    ...TimerNoNesting
    CreatedBy {
      ...UserNoNesting
    }
  }
  TaskProjects {
    id
    createdAt
    updatedAt
    Project {
      ...ProjectNoNesting
      CreatedBy {
        ...UserNoNesting
      }
      Resource {
        id
        name
        uri
      }
    }
  }
  RelatedTo {
    ...TaskNoNesting
  }
  Reactions {
    ...TaskReactionNoNesting
    CreatedBy {
      ...UserNoNesting
    }
  }
}
    ${TaskNoNestingFragmentDoc}
${UserNoNestingFragmentDoc}
${TimerNoNestingFragmentDoc}
${ProjectNoNestingFragmentDoc}
${TaskReactionNoNestingFragmentDoc}`;