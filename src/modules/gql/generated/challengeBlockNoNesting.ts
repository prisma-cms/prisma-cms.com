/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { gql } from '@apollo/client';
export type ChallengeBlockNoNestingFragment = { __typename?: 'CodeChallengeBlock', id: string, externalKey?: Types.Maybe<string>, createdAt: Date, updatedAt: Date, name?: Types.Maybe<string>, rank?: Types.Maybe<number> };

export const ChallengeBlockNoNestingFragmentDoc = gql`
    fragment challengeBlockNoNesting on CodeChallengeBlock {
  id
  externalKey
  createdAt
  updatedAt
  name
  rank
}
    `;