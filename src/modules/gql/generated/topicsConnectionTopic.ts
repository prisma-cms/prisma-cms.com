/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { gql } from '@apollo/client';
export type TopicsConnectionTopicFragment = { __typename?: 'Resource', id: string, updatedAt: any, name: string, uri: string, longtitle?: Types.Maybe<string> };

export const TopicsConnectionTopicFragmentDoc = gql`
    fragment topicsConnectionTopic on Resource {
  id
  updatedAt
  name
  uri
  longtitle
}
    `;