/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { MeUserCodeChallengeCompletionFragment } from './MeUserCodeChallengeCompletion';
import { gql } from '@apollo/client';
import { MeUserCodeChallengeCompletionFragmentDoc } from './MeUserCodeChallengeCompletion';
import * as Apollo from '@apollo/client';
export type UpdateCodeChallengeCompletionProcessorMutationVariables = Types.Exact<{
  data: Types.CodeChallengeCompletionUpdateInput;
  where: Types.CodeChallengeCompletionWhereUniqueInput;
}>;


export type UpdateCodeChallengeCompletionProcessorMutation = { __typename?: 'Mutation', response: { __typename?: 'CodeChallengeCompletionResponse', success: boolean, message?: Types.Maybe<string>, errors: Array<{ __typename?: 'Error', key: string, message: string }>, data?: Types.Maybe<(
      { __typename?: 'CodeChallengeCompletion' }
      & MeUserCodeChallengeCompletionFragment
    )> } };


export const UpdateCodeChallengeCompletionProcessorDocument = gql`
    mutation updateCodeChallengeCompletionProcessor($data: CodeChallengeCompletionUpdateInput!, $where: CodeChallengeCompletionWhereUniqueInput!) {
  response: updateCodeChallengeCompletionProcessor(data: $data, where: $where) {
    success
    message
    errors {
      key
      message
    }
    data {
      ...MeUserCodeChallengeCompletion
    }
  }
}
    ${MeUserCodeChallengeCompletionFragmentDoc}`;
export type UpdateCodeChallengeCompletionProcessorMutationFn = Apollo.MutationFunction<UpdateCodeChallengeCompletionProcessorMutation, UpdateCodeChallengeCompletionProcessorMutationVariables>;

/**
 * __useUpdateCodeChallengeCompletionProcessorMutation__
 *
 * To run a mutation, you first call `useUpdateCodeChallengeCompletionProcessorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCodeChallengeCompletionProcessorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCodeChallengeCompletionProcessorMutation, { data, loading, error }] = useUpdateCodeChallengeCompletionProcessorMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateCodeChallengeCompletionProcessorMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCodeChallengeCompletionProcessorMutation, UpdateCodeChallengeCompletionProcessorMutationVariables>) {
        return Apollo.useMutation<UpdateCodeChallengeCompletionProcessorMutation, UpdateCodeChallengeCompletionProcessorMutationVariables>(UpdateCodeChallengeCompletionProcessorDocument, baseOptions);
      }
export type UpdateCodeChallengeCompletionProcessorMutationHookResult = ReturnType<typeof useUpdateCodeChallengeCompletionProcessorMutation>;
export type UpdateCodeChallengeCompletionProcessorMutationResult = Apollo.MutationResult<UpdateCodeChallengeCompletionProcessorMutation>;
export type UpdateCodeChallengeCompletionProcessorMutationOptions = Apollo.BaseMutationOptions<UpdateCodeChallengeCompletionProcessorMutation, UpdateCodeChallengeCompletionProcessorMutationVariables>;