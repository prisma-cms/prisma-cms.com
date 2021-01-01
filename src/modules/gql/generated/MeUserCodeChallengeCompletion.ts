/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { gql } from '@apollo/client';
export type MeUserCodeChallengeCompletionFragment = { __typename?: 'CodeChallengeCompletion', id: string, Task: { __typename?: 'Task', id: string, status: Types.TaskStatus }, CodeChallenge: { __typename?: 'CodeChallenge', id: string } };

export const MeUserCodeChallengeCompletionFragmentDoc = gql`
    fragment MeUserCodeChallengeCompletion on CodeChallengeCompletion {
  id
  Task {
    id
    status
  }
  CodeChallenge {
    id
  }
}
    `;