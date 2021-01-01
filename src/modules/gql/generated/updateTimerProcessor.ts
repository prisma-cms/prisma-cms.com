/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { TimerNoNestingFragment } from './TimerNoNesting';
import { gql } from '@apollo/client';
import { TimerNoNestingFragmentDoc } from './TimerNoNesting';
import * as Apollo from '@apollo/client';
export type UpdateTimerProcessorMutationVariables = Types.Exact<{
  data: Types.TimerUpdateInput;
  where: Types.TimerWhereUniqueInput;
}>;


export type UpdateTimerProcessorMutation = { __typename?: 'Mutation', response: { __typename?: 'TimerResponse', success: boolean, message?: Types.Maybe<string>, errors: Array<{ __typename?: 'Error', key: string, message: string }>, data?: Types.Maybe<(
      { __typename?: 'Timer' }
      & TimerNoNestingFragment
    )> } };


export const UpdateTimerProcessorDocument = gql`
    mutation updateTimerProcessor($data: TimerUpdateInput!, $where: TimerWhereUniqueInput!) {
  response: updateTimerProcessor(data: $data, where: $where) {
    success
    message
    errors {
      key
      message
    }
    data {
      ...TimerNoNesting
    }
  }
}
    ${TimerNoNestingFragmentDoc}`;
export type UpdateTimerProcessorMutationFn = Apollo.MutationFunction<UpdateTimerProcessorMutation, UpdateTimerProcessorMutationVariables>;

/**
 * __useUpdateTimerProcessorMutation__
 *
 * To run a mutation, you first call `useUpdateTimerProcessorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTimerProcessorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTimerProcessorMutation, { data, loading, error }] = useUpdateTimerProcessorMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateTimerProcessorMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTimerProcessorMutation, UpdateTimerProcessorMutationVariables>) {
        return Apollo.useMutation<UpdateTimerProcessorMutation, UpdateTimerProcessorMutationVariables>(UpdateTimerProcessorDocument, baseOptions);
      }
export type UpdateTimerProcessorMutationHookResult = ReturnType<typeof useUpdateTimerProcessorMutation>;
export type UpdateTimerProcessorMutationResult = Apollo.MutationResult<UpdateTimerProcessorMutation>;
export type UpdateTimerProcessorMutationOptions = Apollo.BaseMutationOptions<UpdateTimerProcessorMutation, UpdateTimerProcessorMutationVariables>;