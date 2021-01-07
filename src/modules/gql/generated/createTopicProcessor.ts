/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { Resource_Fragment } from './resource_';
import { gql } from '@apollo/client';
import { Resource_FragmentDoc } from './resource_';
import * as Apollo from '@apollo/client';
export type CreateTopicProcessorMutationVariables = Types.Exact<{
  data: Types.TopicCreateInput;
}>;


export type CreateTopicProcessorMutation = { __typename?: 'Mutation', response: { __typename?: 'ResourceResponse', success: boolean, message?: Types.Maybe<string>, errors: Array<{ __typename?: 'Error', key: string, message: string }>, data?: Types.Maybe<(
      { __typename?: 'Resource' }
      & Resource_Fragment
    )> } };


export const CreateTopicProcessorDocument = gql`
    mutation createTopicProcessor($data: TopicCreateInput!) {
  response: createTopicProcessor(data: $data) {
    success
    message
    errors {
      key
      message
    }
    data {
      ...resource_
    }
  }
}
    ${Resource_FragmentDoc}`;
export type CreateTopicProcessorMutationFn = Apollo.MutationFunction<CreateTopicProcessorMutation, CreateTopicProcessorMutationVariables>;

/**
 * __useCreateTopicProcessorMutation__
 *
 * To run a mutation, you first call `useCreateTopicProcessorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTopicProcessorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTopicProcessorMutation, { data, loading, error }] = useCreateTopicProcessorMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTopicProcessorMutation(baseOptions?: Apollo.MutationHookOptions<CreateTopicProcessorMutation, CreateTopicProcessorMutationVariables>) {
        return Apollo.useMutation<CreateTopicProcessorMutation, CreateTopicProcessorMutationVariables>(CreateTopicProcessorDocument, baseOptions);
      }
export type CreateTopicProcessorMutationHookResult = ReturnType<typeof useCreateTopicProcessorMutation>;
export type CreateTopicProcessorMutationResult = Apollo.MutationResult<CreateTopicProcessorMutation>;
export type CreateTopicProcessorMutationOptions = Apollo.BaseMutationOptions<CreateTopicProcessorMutation, CreateTopicProcessorMutationVariables>;