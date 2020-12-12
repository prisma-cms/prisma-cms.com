/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { gql } from '@apollo/client';
export type TechnologiesConnectionUserTechnologyFragment = { __typename?: 'UserTechnology', id: string, createdAt: Date, updatedAt: Date, components?: Types.Maybe<Record<string, any> | Array<any>>, date_from?: Types.Maybe<Date>, date_till?: Types.Maybe<Date>, status?: Types.Maybe<Types.UserTechnologyStatus> };

export const TechnologiesConnectionUserTechnologyFragmentDoc = gql`
    fragment technologiesConnectionUserTechnology on UserTechnology {
  id
  createdAt
  updatedAt
  components
  date_from
  date_till
  status
}
    `;