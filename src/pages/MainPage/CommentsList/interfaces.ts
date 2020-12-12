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
export enum CommentUserAvatarAlign {
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
export type CommentUserAvatarProps = {
  /**
   * УРЛ на аватар пользователя
   */
  url: Maybe<string>

  align: CommentUserAvatarAlign
}
