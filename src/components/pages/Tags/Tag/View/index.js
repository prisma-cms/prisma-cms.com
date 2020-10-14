import React from 'react'

import EditableView from 'apollo-cms/lib/DataView/Object/Editable'

import Forum from '../../../../view/forum'

class TagView extends EditableView {
  canEdit() {
    return false
  }

  getTitle() {
    const object = this.getObjectWithMutations()

    const { name } = object || {}

    return (name && `Топики с тегом "${name}"`) || null
  }

  renderDefaultView() {
    const { ...other } = this.props

    const { name: tagName } = this.getObjectWithMutations()

    let forum = null

    if (tagName) {
      forum = (
        <Forum
          where={{
            Tags_some: {
              Tag: {
                name: tagName,
              },
            },
          }}
          {...other}
        />
      )
    }

    return forum
  }

  renderEditableView() {
    return this.renderDefaultView()
  }
}

export default TagView
