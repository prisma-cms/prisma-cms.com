/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { UserNoNestingFragment } from './UserNoNesting';
import { gql } from '@apollo/client';
import { UserNoNestingFragmentDoc } from './UserNoNesting';
export type MainPageCodeChallengeCompletionFragment = { __typename?: 'CodeChallengeCompletion', id: string, CreatedBy?: Types.Maybe<(
    { __typename?: 'User' }
    & UserNoNestingFragment
  )>, Task: { __typename?: 'Task', id: string, status: Types.TaskStatus }, CodeChallenge: { __typename?: 'CodeChallenge', id: string, name?: Types.Maybe<string>, localeTitle?: Types.Maybe<string>, description?: Types.Maybe<string>, instructions?: Types.Maybe<string> } };

export const MainPageCodeChallengeCompletionFragmentDoc = gql`
    fragment mainPageCodeChallengeCompletion on CodeChallengeCompletion {
  id
  CreatedBy {
    ...UserNoNesting
  }
  Task {
    id
    status
  }
  CodeChallenge {
    id
    name
    localeTitle
    description
    instructions
  }
}
    ${UserNoNestingFragmentDoc}`;