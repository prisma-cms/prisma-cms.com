import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import PrismaCmsComponent from "@prisma-cms/component";
import RootConnector from '@prisma-cms/front-editor/lib/components/Root';
import UserPage from './components/pages/Users/User';
import PageHeader from './components/PageHeader';



class RootPage extends PrismaCmsComponent {

  render() {

    const {
      CustomComponents = [],
      ...other
    } = this.props;

    return <RootConnector
      CustomComponents={CustomComponents.concat([
        UserPage,
        PageHeader,
      ])}
      {...other}
    />
  }

}

export default RootPage;