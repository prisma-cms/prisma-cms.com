import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Page from '../../../layout'

import CooperationTaskPage from '@prisma-cms/cooperation/lib/components/pages/Tasks/Task'

export class TaskPage extends Page {
  render() {
    return super.render(<CooperationTaskPage {...this.props} />)
  }
}

export default TaskPage
