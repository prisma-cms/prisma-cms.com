import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ProjectPage } from '../'

class CreateProjectPage extends Component {
  onSave(result) {
    if (result) {
      const { data: object } = (result.data && result.data.response) || {}

      const {
        // id,
        Resource,
      } = object || {}

      const { uri } = Resource || {}

      // if (id) {

      //   const {
      //     history,
      //   } = this.props;

      //   history.push(`/projects/${id}/`);
      // }

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
