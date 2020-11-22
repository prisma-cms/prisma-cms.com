import React from 'react'
// import PropTypes from 'prop-types';

import MainMenu from '../../../../../menu/mainMenu'

import EditorComponent from '@prisma-cms/front-editor/dist/components/App/components/'

class OldPageHeader extends EditorComponent {
  static defaultProps = {
    ...EditorComponent.defaultProps,
  }

  static Name = 'OldPageHeader'

  renderPanelView() {
    const { classes } = this.getEditorContext()

    return super.renderPanelView(
      <div className={classes.panelButton}>Old Page Header</div>
    )
  }

  // getRootElement() {

  //   return MainMenu;
  // }

  renderChildren() {
    return <MainMenu />
  }

  // renderMainView() {

  //   // const {
  //   //   marginTop,
  //   //   marginBottom,
  //   // } = this.getComponentProps(this);

  //   const {
  //     style,
  //     marginTop,
  //     marginBottom,
  //     ...other
  //   } = this.getRenderProps();

  //   return <div
  //     style={{
  //       marginTop,
  //       marginBottom,
  //       ...style,
  //     }}
  //     {...other}
  //   >
  //     {super.renderMainView()}
  //   </div>;
  // }
}

export default OldPageHeader
