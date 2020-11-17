/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { TopicsConnectionUserFragment } from './topicsConnectionUser';
import { gql } from '@apollo/client';
import { TopicsConnectionUserFragmentDoc } from './topicsConnectionUser';
export type TopicsConnectionTopicFragment = { __typename?: 'Resource', id: string, updatedAt: Date, name: string, uri: string, longtitle?: Types.Maybe<string>, CreatedBy: (
    { __typename?: 'User' }
    & TopicsConnectionUserFragment
  ), Comments?: Types.Maybe<Array<{ __typename?: 'Resource', id: string, updatedAt: Date, CreatedBy: (
      { __typename?: 'User' }
      & TopicsConnectionUserFragment
    ) }>>, Blog?: Types.Maybe<{ __typename?: 'Resource', id: string, name: string, longtitle?: Types.Maybe<string>, uri: string }>, Tags?: Types.Maybe<Array<{ __typename?: 'ResourceTag', Tag: { __typename?: 'Tag', id: string, name: string } }>> };

export const TopicsConnectionTopicFragmentDoc = gql`
    fragment topicsConnectionTopic on Resource {
  id
  updatedAt
  name
  uri
  longtitle
  CreatedBy {
    ...topicsConnectionUser
  }
  Comments(orderBy: id_ASC) {
    id
    updatedAt
    CreatedBy {
      ...topicsConnectionUser
    }
  }
  Blog {
    id
    name
    longtitle
    uri
  }
  Tags {
    Tag {
      id
      name
    }
  }
}
    ${TopicsConnectionUserFragmentDoc}`;