/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { gql } from '@apollo/client';
export type ProjectMemberNoNestingFragment = { __typename?: 'ProjectMember', id: string, createdAt: Date, updatedAt: Date, status?: Types.Maybe<Types.ProjectMemberStatus> };

export const ProjectMemberNoNestingFragmentDoc = gql`
    fragment ProjectMemberNoNesting on ProjectMember {
  id
  createdAt
  updatedAt
  status
}
    `;