/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { User_Fragment } from './user_';
import { gql } from '@apollo/client';
import { User_FragmentDoc } from './user_';
import * as Apollo from '@apollo/client';
export type UpdateUserProcessorMutationVariables = Types.Exact<{
  where: Types.UserWhereUniqueInput;
  data: Types.UserUpdateInput;
}>;


export type UpdateUserProcessorMutation = { __typename?: 'Mutation', updateUserProcessor: { __typename?: 'UserResponse', success: boolean, message?: Types.Maybe<string>, errors: Array<{ __typename?: 'Error', key: string, message: string }>, data?: Types.Maybe<(
      { __typename?: 'User' }
      & User_Fragment
    )> } };


export const UpdateUserProcessorDocument = gql`
    mutation updateUserProcessor($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
  updateUserProcessor(where: $where, data: $data) {
    success
    message
    errors {
      key
      message
    }
    data {
      ...user_
    }
  }
}
    ${User_FragmentDoc}`;
export type UpdateUserProcessorMutationFn = Apollo.MutationFunction<UpdateUserProcessorMutation, UpdateUserProcessorMutationVariables>;

/**
 * __useUpdateUserProcessorMutation__
 *
 * To run a mutation, you first call `useUpdateUserProcessorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProcessorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProcessorMutation, { data, loading, error }] = useUpdateUserProcessorMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserProcessorMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserProcessorMutation, UpdateUserProcessorMutationVariables>) {
        return Apollo.useMutation<UpdateUserProcessorMutation, UpdateUserProcessorMutationVariables>(UpdateUserProcessorDocument, baseOptions);
      }
export type UpdateUserProcessorMutationHookResult = ReturnType<typeof useUpdateUserProcessorMutation>;
export type UpdateUserProcessorMutationResult = Apollo.MutationResult<UpdateUserProcessorMutation>;
export type UpdateUserProcessorMutationOptions = Apollo.BaseMutationOptions<UpdateUserProcessorMutation, UpdateUserProcessorMutationVariables>;