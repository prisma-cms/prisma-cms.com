import React, { Component } from 'react'
import PropTypes from 'prop-types'

import EditorComponent from '@prisma-cms/front-editor/lib/components/App/components/'

import { Switch, Route } from 'react-router-dom'

class OldPages extends EditorComponent {
  static defaultProps = {
    ...EditorComponent.defaultProps,
  }

  static Name = 'OldPages'

  renderPanelView() {
    const { classes } = this.getEditorContext()

    return super.renderPanelView(
      <div className={classes.panelButton}>Old Pages</div>
    )
  }

  renderChildren() {
    const { oldRoutes } = this.context

    return (
      <Switch>
        {oldRoutes.map((n) => {
          const { path } = n

          return <Route key={path} {...n} />
        })}
      </Switch>
    )
  }
}

export default OldPages
