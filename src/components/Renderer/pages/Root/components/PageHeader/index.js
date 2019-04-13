import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MainMenu from '../../../../../menu/mainMenu';

import EditorComponent from "@prisma-cms/front-editor/lib/components/App/components/";

class PageHeader extends EditorComponent {

  static defaultProps = {
    ...EditorComponent.defaultProps,
  }

  static Name = "PageHeader"

  renderPanelView() {

    const {
      classes,
    } = this.context;

    return super.renderPanelView(<div
      className={classes.panelButton}
    >
      Page Header
    </div>);
  }


  // getRootElement() {

  //   return MainMenu;
  // }

  renderChildren(){

    return <MainMenu

    />
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

export default PageHeader;
