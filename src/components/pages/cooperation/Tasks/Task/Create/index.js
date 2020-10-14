import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import {
//   TaskPage,
// } from "../";

import { TaskPage } from '@prisma-cms/cooperation/lib/components/pages/Tasks/Task'

class CreateTaskPage extends Component {
  onSave(result) {
    if (result) {
      const { data: object } = (result.data && result.data.response) || {}

      const { id } = object || {}

      if (id) {
        const { history } = this.props

        history.push(`/tasks/${id}/`)
      }
    }
  }

  render() {
    const {
      match: {
        params: { projectId },
      },
    } = this.props

    return (
      <TaskPage
        data={{
          object: {},
        }}
        _dirty={{
          name: '',
          Project: projectId
            ? {
                connect: {
                  id: projectId,
                },
              }
            : undefined,
        }}
        onSave={(result) => this.onSave(result)}
      />
    )
  }
}

export default CreateTaskPage
