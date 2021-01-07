import React from 'react'

import {
  EditorComponent,
  EditorComponentProps,
  EditorComponentState,
} from '@prisma-cms/front-editor'
// import ResourceFields from '..'

export class ResourceField<
  P extends EditorComponentProps = EditorComponentProps,
  S extends EditorComponentState = EditorComponentState
> extends EditorComponent<P, S> {
  static Name = 'ResourceField'

  static defaultProps = {
    ...EditorComponent.defaultProps,
  }

  renderPanelView(content: React.ReactNode) {
    return super.renderPanelView(
      content || <div className={'panelButton'}>ResourceField</div>
    )
  }

  // canBeParent(parent: P['parent']) {
  //   return super.canBeParent(parent) && parent instanceof ResourceFields
  // }
}

export default ResourceField
