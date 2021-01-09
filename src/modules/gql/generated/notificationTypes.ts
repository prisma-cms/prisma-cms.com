/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { NotificationTypeNoNestingFragment } from './NotificationTypeNoNesting';
import { gql } from '@apollo/client';
import { NotificationTypeNoNestingFragmentDoc } from './NotificationTypeNoNesting';
import * as Apollo from '@apollo/client';
export type NotificationTypesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type NotificationTypesQuery = { __typename?: 'Query', notificationTypes: Array<Types.Maybe<(
    { __typename?: 'NotificationType' }
    & NotificationTypeNoNestingFragment
  )>> };


export const NotificationTypesDocument = gql`
    query notificationTypes {
  notificationTypes(orderBy: createdAt_ASC) {
    ...NotificationTypeNoNesting
  }
}
    ${NotificationTypeNoNestingFragmentDoc}`;

/**
 * __useNotificationTypesQuery__
 *
 * To run a query within a React component, call `useNotificationTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useNotificationTypesQuery(baseOptions?: Apollo.QueryHookOptions<NotificationTypesQuery, NotificationTypesQueryVariables>) {
        return Apollo.useQuery<NotificationTypesQuery, NotificationTypesQueryVariables>(NotificationTypesDocument, baseOptions);
      }
export function useNotificationTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationTypesQuery, NotificationTypesQueryVariables>) {
          return Apollo.useLazyQuery<NotificationTypesQuery, NotificationTypesQueryVariables>(NotificationTypesDocument, baseOptions);
        }
export type NotificationTypesQueryHookResult = ReturnType<typeof useNotificationTypesQuery>;
export type NotificationTypesLazyQueryHookResult = ReturnType<typeof useNotificationTypesLazyQuery>;
export type NotificationTypesQueryResult = Apollo.QueryResult<NotificationTypesQuery, NotificationTypesQueryVariables>;