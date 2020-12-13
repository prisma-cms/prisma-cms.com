import React, { PureComponent } from 'react'
import Prism from 'prismjs'

import { PrismFormattedProps } from './interfaces'

class PrismFormatted extends PureComponent<PrismFormattedProps> {
  declare instructionsRef: any

  static displayName = 'PrismFormatted'

  componentDidMount() {
    // Just in case 'current' has not been created, though it should have been.
    if (this.instructionsRef.current) {
      Prism.highlightAllUnder(this.instructionsRef.current)
    }
  }

  constructor(props: PrismFormattedProps) {
    super(props)
    this.instructionsRef = React.createRef()
  }

  render() {
    const { text, className } = this.props
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: text }}
        ref={this.instructionsRef}
      />
    )
  }
}

export default PrismFormatted
