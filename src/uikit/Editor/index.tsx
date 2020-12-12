import React from 'react'

// import PropTypes from "prop-types";

import PrismaEditor from '@prisma-cms/editor'
import { EditorProps } from './interfaces'
import LinkComponent from './LinkComponent'

// import "@prisma-cms/editor/lib/styles/less/styles.css";

/**
 * Важный момент: draft-js генерирует ключи для блоков и прочих сущностей,
 * поэтому передавать надо только готовый стейт или вообще ничего.
 * Если ничего не передано и не в режиме редактирования, то нельзя рендерить редактор
 */
const Editor: React.FC<EditorProps> = (props) => {
  //   static propTypes = {
  //   content: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  //   inEditMode: PropTypes.bool.isRequired,
  // }

  //   static defaultProps = {
  //   inEditMode: false,
  // }

  const {
    value,
    // inEditMode,
    readOnly,
    // fullView,
    onChange,
    ...other
  } = props

  if (!value && readOnly) {
    return null
  }

  return (
    <PrismaEditor
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      LinkComponent={LinkComponent}
      {...other}
    />
  )
}

Editor.defaultProps = {
  readOnly: true,
}

export default Editor
