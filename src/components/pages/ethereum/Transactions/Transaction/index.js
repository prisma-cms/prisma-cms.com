import React from 'react'

import Page from '../../../layout'

import { TransactionPage as BaseTransactionPage } from '@prisma-cms/ethereum'

class TransactionPage extends Page {
  render() {
    return super.render(<BaseTransactionPage {...this.props} />)
  }
}

export default TransactionPage
