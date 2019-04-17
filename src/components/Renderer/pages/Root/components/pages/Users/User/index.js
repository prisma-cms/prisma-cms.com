import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditorComponent from "@prisma-cms/front-editor/lib/components/App/components/";

// import Icon from "material-ui-icons/SettingsOverscan";

import CustomUserPage from "../../../../../UsersPage/UserPage";

class UserPage extends EditorComponent {

  // static defaultProps = {
  //   ...EditorComponent.defaultProps,
  //   marginTop: 10,
  //   marginBottom: 10,
  // }

  static Name = "UserPage"

  renderPanelView() {

    const {
      classes,
    } = this.getEditorContext();

    return super.renderPanelView(<div
      className={classes.panelButton}
    >
      {/* <Icon />  */}
      User page
    </div>);
  }


  renderChildren() {

    // const {
    //   ...other
    // } = this.getComponentProps(this);





    const {
      parent,
    } = this.props;

    if (!parent) {
      return false;
    }

    const {
      props: {
        match,
      },
    } = parent;



    const {
      params: where,
    } = match || {};

    if (!where) {
      return null;
    }

    return <CustomUserPage
      where={where}
    />;
  }

  // getRenderProps() {

  //   const {
  //     style,
  //     marginTop,
  //     marginBottom,
  //     // props: {
  //     //   ...otherProps
  //     // },
  //     ...other
  //   } = super.getRenderProps();

  //   // const {
  //   //   text,
  //   //   // type,
  //   //   // style,
  //   //   color,
  //   //   display,
  //   //   displayType,
  //   //   ...otherProps
  //   // } = this.getComponentProps(this);





  //   const renderProps = {
  //     style: {
  //       ...style,
  //       marginTop,
  //       marginBottom,
  //     },
  //     ...other,
  //     // ...otherProps
  //   }




  //   return renderProps;
  // }

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

export default UserPage;
