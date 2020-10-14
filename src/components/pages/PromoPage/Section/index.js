import React from 'react'

import EditorComponent from '@prisma-cms/front/lib/components/FrontEditor/components'

class Section extends EditorComponent {
  static defaultProps = {
    ...EditorComponent.defaultProps,
    marginTop: 10,
    marginBottom: 10,
  }

  renderMainView() {
    const { marginTop, marginBottom } = this.getComponentProps(this)

    const { style, ...other } = this.getRenderProps()

    return (
      <div
        style={{
          ...style,
          marginTop,
          marginBottom,
        }}
        {...other}
      >
        {super.renderMainView()}
      </div>
    )
  }
}

export default Section
