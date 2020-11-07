/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { TopicUserFragment } from './topicUser';
import { gql } from '@apollo/client';
import { TopicUserFragmentDoc } from './topicUser';
export type TopicObjectFragment = { __typename?: 'Resource', id: string, createdAt: any, updatedAt: any, type?: Types.Maybe<Types.ResourceType>, name: string, longtitle?: Types.Maybe<string>, content?: Types.Maybe<any>, components?: Types.Maybe<any>, contentText?: Types.Maybe<string>, published: boolean, deleted: boolean, hidemenu: boolean, searchable: boolean, uri: string, isfolder: boolean, rating?: Types.Maybe<number>, positiveVotesCount?: Types.Maybe<number>, negativeVotesCount?: Types.Maybe<number>, neutralVotesCount?: Types.Maybe<number>, oldID?: Types.Maybe<number>, commentOldID?: Types.Maybe<number>, class_key?: Types.Maybe<string>, template?: Types.Maybe<number>, mockUpdate?: Types.Maybe<any>, CreatedBy: (
    { __typename?: 'User' }
    & TopicUserFragment
  ), Comments?: Types.Maybe<Array<{ __typename?: 'Resource', id: string, uri: string, createdAt: any, updatedAt: any, content?: Types.Maybe<any>, CreatedBy: (
      { __typename?: 'User' }
      & TopicUserFragment
    ) }>>, Blog?: Types.Maybe<{ __typename?: 'Resource', id: string, name: string, longtitle?: Types.Maybe<string>, uri: string }>, Tags?: Types.Maybe<Array<{ __typename?: 'ResourceTag', Tag: { __typename?: 'Tag', id: string, name: string } }>> };

export const TopicObjectFragmentDoc = gql`
    fragment topicObject on Resource {
  id
  createdAt
  updatedAt
  type
  name
  longtitle
  content
  components
  contentText
  published
  deleted
  hidemenu
  searchable
  uri
  isfolder
  rating
  positiveVotesCount
  negativeVotesCount
  neutralVotesCount
  oldID
  commentOldID
  class_key
  template
  mockUpdate
  CreatedBy {
    ...topicUser
  }
  Comments(orderBy: id_ASC) {
    id
    uri
    createdAt
    updatedAt
    content
    CreatedBy {
      ...topicUser
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
    ${TopicUserFragmentDoc}`;