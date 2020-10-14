import React from 'react'

import Page from '../../layout'

import { TimersPage as PrismaCmsTimersPage } from '@prisma-cms/cooperation'

class TimersPage extends Page {
  render() {
    return super.render(<PrismaCmsTimersPage {...this.props} />)
  }
}

export default TimersPage
