
declare module '@prisma-cms/ui' {

  import React from 'react';

  export interface UploaderProps {

    onUpload(result: any): any;

    inEditMode: boolean;

    helperText?: string;

    classes?: any;

  }

  export class Uploader extends React.Component<UploaderProps> {

  }

}
