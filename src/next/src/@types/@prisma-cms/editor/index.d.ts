declare module '@prisma-cms/editor' {
  import React, { ReactNode } from 'react'

  /**
   * Strings not allowed due key generation
   */
  export type PrismaCmsEditorRawContent = Record<string, any>

  export interface PrismaCmsEditorProps {
    value?: PrismaCmsEditorRawContent

    /**
     * Prevent edit content. Default true
     */
    readOnly?: boolean

    onChange?(
      content: PrismaCmsEditorRawContent,
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

    className?: string
  }

  export default class Editor extends React.Component<PrismaCmsEditorProps> {}
}
