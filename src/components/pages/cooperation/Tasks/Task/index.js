import React from 'react'

import Page from '../../../layout'

import CooperationTaskPage from '@prisma-cms/cooperation/lib/components/pages/Tasks/Task'

export class TaskPage extends Page {
  render() {
    return super.render(<CooperationTaskPage {...this.props} />)
  }
}

export default TaskPage
