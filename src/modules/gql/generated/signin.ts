/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { FragmentAuthPayloadFragment } from './FragmentAuthPayload';
import { gql } from '@apollo/client';
import { FragmentAuthPayloadFragmentDoc } from './FragmentAuthPayload';
import * as Apollo from '@apollo/client';
export type SigninMutationVariables = Types.Exact<{
  where: Types.UserWhereUniqueInput;
  data: Types.SigninDataInput;
}>;


export type SigninMutation = { __typename?: 'Mutation', response: (
    { __typename?: 'AuthPayload' }
    & FragmentAuthPayloadFragment
  ) };


export const SigninDocument = gql`
    mutation signin($where: UserWhereUniqueInput!, $data: SigninDataInput!) {
  response: signin(where: $where, data: $data) {
    ...FragmentAuthPayload
  }
}
    ${FragmentAuthPayloadFragmentDoc}`;
export type SigninMutationFn = Apollo.MutationFunction<SigninMutation, SigninMutationVariables>;

/**
 * __useSigninMutation__
 *
 * To run a mutation, you first call `useSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinMutation, { data, loading, error }] = useSigninMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSigninMutation(baseOptions?: Apollo.MutationHookOptions<SigninMutation, SigninMutationVariables>) {
        return Apollo.useMutation<SigninMutation, SigninMutationVariables>(SigninDocument, baseOptions);
      }
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult = Apollo.MutationResult<SigninMutation>;
export type SigninMutationOptions = Apollo.BaseMutationOptions<SigninMutation, SigninMutationVariables>;