/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { UserNoNestingFragment } from './UserNoNesting';
import { gql } from '@apollo/client';
import { UserNoNestingFragmentDoc } from './UserNoNesting';
export type Tag_Fragment = { __typename?: 'Tag', id: string, name: string, Resources?: Types.Maybe<Array<{ __typename?: 'ResourceTag', id: string, Resource: { __typename?: 'Resource', id: string, type?: Types.Maybe<Types.ResourceType>, name: string, uri: string } }>>, CreatedBy: (
    { __typename?: 'User' }
    & UserNoNestingFragment
  ) };

export const Tag_FragmentDoc = gql`
    fragment tag_ on Tag {
  id
  name
  Resources {
    id
    Resource {
      id
      type
      name
      uri
    }
  }
  CreatedBy {
    ...UserNoNesting
  }
}
    ${UserNoNestingFragmentDoc}`;