/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { UsersConnectionProjectFragment } from './usersConnectionProject';
import { UsersConnectionResourceFragment } from './usersConnectionResource';
import { gql } from '@apollo/client';
import { UsersConnectionProjectFragmentDoc } from './usersConnectionProject';
import { UsersConnectionResourceFragmentDoc } from './usersConnectionResource';
export type UsersConnectionUserFragment = { __typename?: 'User', id: string, createdAt: any, updatedAt: any, username?: Types.Maybe<string>, email?: Types.Maybe<string>, phone?: Types.Maybe<string>, showEmail?: Types.Maybe<boolean>, showPhone?: Types.Maybe<boolean>, password?: Types.Maybe<string>, fullname?: Types.Maybe<string>, image?: Types.Maybe<string>, address?: Types.Maybe<string>, sudo?: Types.Maybe<boolean>, active?: Types.Maybe<boolean>, activated?: Types.Maybe<boolean>, deleted?: Types.Maybe<boolean>, hasEmail: boolean, hasPhone: boolean, marketplaceToken?: Types.Maybe<string>, hidden?: Types.Maybe<boolean>, EthAccounts?: Types.Maybe<Array<{ __typename?: 'EthAccount', id: string, createdAt: any, updatedAt: any, name?: Types.Maybe<string>, description?: Types.Maybe<any>, address: string, type?: Types.Maybe<Types.EthAccountType>, source?: Types.Maybe<string>, bytecode?: Types.Maybe<string>, abi?: Types.Maybe<any>, balance?: Types.Maybe<number> }>>, NotificationTypes?: Types.Maybe<Array<{ __typename?: 'NotificationType', id: string, createdAt: any, updatedAt: any, name: string, code?: Types.Maybe<string>, comment?: Types.Maybe<string>, oldID?: Types.Maybe<number> }>>, Projects?: Types.Maybe<Array<{ __typename?: 'ProjectMember', id: string, createdAt: any, updatedAt: any, status?: Types.Maybe<Types.ProjectMemberStatus>, Project: (
      { __typename?: 'Project', Resource?: Types.Maybe<(
        { __typename?: 'Resource' }
        & UsersConnectionResourceFragment
      )> }
      & UsersConnectionProjectFragment
    ) }>>, ProjectsCreated?: Types.Maybe<Array<(
    { __typename?: 'Project', Resource?: Types.Maybe<(
      { __typename?: 'Resource' }
      & UsersConnectionResourceFragment
    )> }
    & UsersConnectionProjectFragment
  )>> };

export const UsersConnectionUserFragmentDoc = gql`
    fragment usersConnectionUser on User {
  id
  createdAt
  updatedAt
  username
  email
  phone
  showEmail
  showPhone
  password
  fullname
  image
  address
  sudo
  active
  activated
  deleted
  hasEmail
  hasPhone
  marketplaceToken
  hidden
  EthAccounts {
    id
    createdAt
    updatedAt
    name
    description
    address
    type
    source
    bytecode
    abi
    balance
  }
  NotificationTypes {
    id
    createdAt
    updatedAt
    name
    code
    comment
    oldID
  }
  Projects {
    id
    createdAt
    updatedAt
    status
    Project {
      ...usersConnectionProject
      Resource {
        ...usersConnectionResource
      }
    }
  }
  ProjectsCreated {
    ...usersConnectionProject
    Resource {
      ...usersConnectionResource
    }
  }
}
    ${UsersConnectionProjectFragmentDoc}
${UsersConnectionResourceFragmentDoc}`;