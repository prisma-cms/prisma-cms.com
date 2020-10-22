/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { AuthUserFragment } from './AuthUser';
import { gql } from '@apollo/client';
import { AuthUserFragmentDoc } from './AuthUser';
export type FragmentAuthPayloadFragment = { __typename?: 'AuthPayload', success: boolean, message?: Types.Maybe<string>, token?: Types.Maybe<string>, errors: Array<{ __typename?: 'Error', key: string, message: string }>, data?: Types.Maybe<(
    { __typename?: 'User' }
    & AuthUserFragment
  )> };

export const FragmentAuthPayloadFragmentDoc = gql`
    fragment FragmentAuthPayload on AuthPayload {
  success
  message
  errors {
    key
    message
  }
  token
  data {
    ...AuthUser
  }
}
    ${AuthUserFragmentDoc}`;