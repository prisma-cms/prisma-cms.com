import React from 'react'
import { useNotificationTypesQuery } from 'src/modules/gql/generated'
import Grid from 'src/uikit/Grid'
import { UserNotificationsProps } from './interfacse'
import UserNotification from './Notification'

const UserNotifications: React.FC<UserNotificationsProps> = ({
  NotificationTypes,
  userId,
}) => {
  const notifications =
    useNotificationTypesQuery().data?.notificationTypes ?? []

  return (
    <Grid container spacing={8}>
      {notifications.map((n) => {
        if (!n) {
          return null
        }

        const { id, name, comment } = n

        return (
          <Grid key={id} item xs={12}>
            <UserNotification
              object={n}
              checked={
                NotificationTypes?.findIndex((n) => n.id === id) !== -1 ?? false
              }
              label={comment || name}
              userId={userId}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default UserNotifications
