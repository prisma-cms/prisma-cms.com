import React from 'react'

import GridProto, { GridProps } from 'material-ui/Grid'

export default class Grid extends React.PureComponent<GridProps> {
  render() {
    const {
      spacing,
      // style,
      ...other
    } = this.props

    const content = <GridProto spacing={spacing} {...other} />

    return spacing && spacing > 0 ? (
      <div
        style={{
          padding: spacing / 2,
          width: '100%',
          // ...style,
        }}
      >
        {content}
      </div>
    ) : (
      content
    )
  }
}
