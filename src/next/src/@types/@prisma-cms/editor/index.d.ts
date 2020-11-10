declare module '@prisma-cms/editor' {
  import React, { ReactNode } from 'react'

  /**
   * Strings not allowed due key generation
   */
  export type PrismaCmsEditorValue = Record<string, any>

  export interface PrismaCmsEditorProps {
    value?: PrismaCmsEditorValue

    /**
     * Prevent edit content. Default true
     */
    readOnly?: boolean

    onChange?(
      content: PrismaCmsEditorValue,
      contentState: Record<string, any>
    ): any

    // Обязательно надо передавать какой-то статический ключ, например editor
    // иначе будет каждый раз генерироваться новый и реакт будет ругаться,
    // что атрибут data-editor серверный и клиентский не совпадают
    editorKey: string

    /**
     * Передаем next/link
     */
    LinkComponent?: ReactNode
  }

  export default class Editor extends React.Component<PrismaCmsEditorProps> {}
}
