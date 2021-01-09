import {
  NotificationTypeNoNestingFragment,
  Scalars,
} from 'src/modules/gql/generated'

export type UserNotificationProps = {
  object: NotificationTypeNoNestingFragment
  checked: boolean
  label: string
  userId: Scalars['ID']
}
