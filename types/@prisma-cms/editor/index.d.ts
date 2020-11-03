declare module '@prisma-cms/editor' {
  import React from 'react'

  export interface EditorProps {
    value: any

    readOnly: boolean

    onChange(content: any): any

    // Обязательно надо передавать какой-то статический ключ, например editor
    // иначе будет каждый раз генерироваться новый и реакт будет ругаться,
    // что атрибут data-editor серверный и клиентский не совпадают
    editorKey: string
  }

  export default class Editor extends React.Component<EditorProps> {}
}
