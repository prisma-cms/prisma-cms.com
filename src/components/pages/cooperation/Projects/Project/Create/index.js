import React, { Component } from 'react'

import { ProjectPage } from '../'

class CreateProjectPage extends Component {
  onSave(result) {
    if (result) {
      const { data: object } = (result.data && result.data.response) || {}

      const { Resource } = object || {}

      const { uri } = Resource || {}

      if (uri) {
        const { history } = this.props

        history.push(uri)
      }
    }
  }

  render() {
    return (
      <ProjectPage
        data={{
          object: {
            Project: {},
          },
        }}
        _dirty={{
          name: '',
        }}
        onSave={(result) => this.onSave(result)}
      />
    )
  }
}

export default CreateProjectPage
