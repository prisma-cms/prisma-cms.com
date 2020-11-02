
declare module "@prisma-cms/editor" {

  import React from 'react';

  export interface EditorProps {
    
    value: any;

    readOnly: boolean;

    onChange(content: any): any;

  }

  export default class Editor extends React.Component<EditorProps> {

  }

}
