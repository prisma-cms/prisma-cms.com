import { UserNoNestingFragment } from 'src/modules/gql/generated'

export interface UserAvatarProps {
  classes?: Record<string, any>

  size?: 'normal' | 'small' | 'big'

  editable?: boolean

  user: Partial<UserNoNestingFragment> & {
    __typename?: 'User'
  }
}
