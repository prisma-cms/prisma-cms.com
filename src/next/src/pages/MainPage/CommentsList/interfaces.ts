import { Maybe } from 'src/modules/gql/generated'

export type CommentsListVariables = {
  skip?: number
  first?: number
}

export type CommentsListProps = {
  variables: CommentsListVariables
}

/**
 * Выравнивание аватарки
 */
export enum UserAvatarAlign {
  /**
   * Слева
   */
  Left,

  /**
   * Справа
   */
  Right,
}

/**
 * Свойства для аватара пользователя
 */
export type UserAvatarProps = {
  /**
   * УРЛ на аватар пользователя
   */
  url: Maybe<string>

  align: UserAvatarAlign
}
