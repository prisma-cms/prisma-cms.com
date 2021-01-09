import {
  NotificationTypeNoNestingFragment,
  Scalars,
} from 'src/modules/gql/generated'

export type UserNotificationsProps = {
  /**
   * Настройки уведомлений
   */
  NotificationTypes: NotificationTypeNoNestingFragment[] | null | undefined

  userId: Scalars['ID']
}
