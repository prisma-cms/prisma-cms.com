import { TypographyProps } from 'material-ui/Typography'
// import { User } from "src/modules/gql/generated";
import { UiLinkProps } from '../interfaces'

export enum UserLinkAvatarSize {
  small = 'small',
  normal = 'normal',
}

export type UserLinkUser = {
  id: string
  username?: string | null
  fullname?: string | null
}

export interface UserLinkProps {
  user?: UserLinkUser

  variant?: TypographyProps['variant']

  withAvatar: boolean

  classes?: UiLinkProps['classes'] & { avatar: string }

  /**
   * Дополнительный контент
   */
  secondary?: any

  showName: boolean

  size: UserLinkAvatarSize

  avatarProps?: any

  // TODO: заменить на какую-то универсальную сущность типа secondaryText
  /**
   * Должность или позиция в команде
   */
  position?: any

  onClick?: (event?: any) => void

  className?: string;
}
