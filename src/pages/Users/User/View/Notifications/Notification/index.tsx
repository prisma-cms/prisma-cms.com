import React, { useCallback } from 'react'
import { UserNotificationProps } from './interfacse'

import CheckBox from 'src/uikit/CheckBox'
import {
  UpdateUserProcessorMutationVariables,
  useUpdateUserProcessorMutation,
} from 'src/modules/gql/generated'

const UserNotification: React.FC<UserNotificationProps> = ({
  object,
  checked,
  label,
  userId,
}) => {
  const [mutate] = useUpdateUserProcessorMutation()

  const onChange = useCallback(
    (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      const action = checked ? 'connect' : 'disconnect'

      const variables: UpdateUserProcessorMutationVariables = {
        where: {
          id: userId,
        },
        data: {
          NotificationTypes: {
            [action]: {
              id: object.id,
            },
          },
        },
      }

      mutate({
        variables,
      })
    },
    [mutate, object.id, userId]
  )

  return <CheckBox checked={checked} label={label} onChange={onChange} />
}

export default UserNotification
