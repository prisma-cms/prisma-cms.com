/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { gql } from '@apollo/client';
export type CodeChallengeCompletion_Fragment = { __typename?: 'CodeChallengeCompletion', id: string, createdAt: Date, updatedAt: Date, success?: Types.Maybe<boolean>, content?: Types.Maybe<string>, Task: { __typename?: 'Task', id: string, status: Types.TaskStatus }, CodeChallenge: { __typename?: 'CodeChallenge', id: string } };

export const CodeChallengeCompletion_FragmentDoc = gql`
    fragment codeChallengeCompletion_ on CodeChallengeCompletion {
  id
  createdAt
  updatedAt
  success
  content
  Task {
    id
    status
  }
  CodeChallenge {
    id
  }
}
    `;