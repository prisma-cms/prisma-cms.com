import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import SingleUploaderInput from '../../../../../react-cms-uploads/src/components/uploader/SingleUploader';

import Button from 'material-ui/Button/Button'

import NoPhoto from 'material-ui-icons/PersonOutline'

import Avatar from '@modxclub/ui/src/Avatar'

import Uploader from '@prisma-cms/ui/lib/Uploader'

export default class UserProfileAvatar extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    inEditMode: PropTypes.bool.isRequired,
  }

  onUpload(r) {
    const { singleUpload } = r.data

    const { updateUser } = this.props

    updateUser(singleUpload)
  }

  render() {
    const { user, inEditMode, ...other } = this.props

    if (!user) {
      return null
    }

    const { image } = user

    const avatar = image ? (
      <Avatar user={user} size="big" {...other} />
    ) : (
      <NoPhoto />
    )

    return inEditMode ? (
      <Uploader
        onUpload={(result) => this.onUpload(result)}
        // FileInput={FileInput}
        inEditMode={inEditMode}
      >
        {avatar}
      </Uploader>
    ) : (
      avatar
    )
  }
}
