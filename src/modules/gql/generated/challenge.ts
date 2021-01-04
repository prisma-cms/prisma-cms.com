/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { gql } from '@apollo/client';
export type ChallengeFragment = { __typename?: 'CodeChallenge', id: string, name?: Types.Maybe<string>, localeTitle?: Types.Maybe<string> };

export const ChallengeFragmentDoc = gql`
    fragment challenge on CodeChallenge {
  id
  name
  localeTitle
}
    `;