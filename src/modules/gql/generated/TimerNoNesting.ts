/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { gql } from '@apollo/client';
export type TimerNoNestingFragment = { __typename?: 'Timer', id: string, createdAt: any, updatedAt: any, stopedAt?: Types.Maybe<any> };

export const TimerNoNestingFragmentDoc = gql`
    fragment TimerNoNesting on Timer {
  id
  createdAt
  updatedAt
  stopedAt
}
    `;