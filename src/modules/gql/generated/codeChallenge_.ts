/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { UserNoNestingFragment } from './UserNoNesting';
import { gql } from '@apollo/client';
import { UserNoNestingFragmentDoc } from './UserNoNesting';
export type CodeChallenge_Fragment = { __typename?: 'CodeChallenge', id: string, externalKey?: Types.Maybe<string>, createdAt: Date, updatedAt: Date, name?: Types.Maybe<string>, dashedName?: Types.Maybe<string>, localeTitle?: Types.Maybe<string>, description?: Types.Maybe<string>, challengeType?: Types.Maybe<number>, forumTopicId?: Types.Maybe<number>, translations?: Types.Maybe<Record<string, any> | Array<any>>, tests?: Types.Maybe<Record<string, any> | Array<any>>, solutions?: Types.Maybe<Record<string, any> | Array<any>>, instructions?: Types.Maybe<string>, files?: Types.Maybe<Record<string, any> | Array<any>>, videoUrl?: Types.Maybe<string>, order?: Types.Maybe<number>, superOrder?: Types.Maybe<number>, challengeOrder?: Types.Maybe<number>, required?: Types.Maybe<Record<string, any> | Array<any>>, isRequired?: Types.Maybe<boolean>, isPrivate?: Types.Maybe<boolean>, isBeta?: Types.Maybe<boolean>, template?: Types.Maybe<string>, rank?: Types.Maybe<number>, CreatedBy?: Types.Maybe<(
    { __typename?: 'User' }
    & UserNoNestingFragment
  )> };

export const CodeChallenge_FragmentDoc = gql`
    fragment codeChallenge_ on CodeChallenge {
  id
  CreatedBy {
    ...UserNoNesting
  }
  id
  externalKey
  createdAt
  updatedAt
  name
  dashedName
  localeTitle
  description
  challengeType
  forumTopicId
  translations
  tests
  solutions
  instructions
  files
  videoUrl
  order
  superOrder
  challengeOrder
  required
  isRequired
  isPrivate
  isBeta
  template
  rank
}
    ${UserNoNestingFragmentDoc}`;