import React from 'react'
import PropTypes from 'prop-types'

import { ObjectsListView, styles } from '..'
// import { TopicsConnectionQueryHookResult } from 'src/modules/gql/generated';

// export default ObjectsListView as unknown as React.PureComponent;

// type Dd = React.PureComponent<{}, {}>;

export interface ObjectsListViewInterface {
  classes: any

  // TODO: Здесь можно задать типы для входячих свойств
  // data: TopicsConnectionQueryHookResult

  data: any
}

class ObjectsListViewDec extends React.PureComponent<ObjectsListViewInterface> {
  static propTypes = {
    ...ObjectsListView.propTypes,

    classes: PropTypes.object,
  }

  static defaultProps = { ...ObjectsListView.defaultProps }
}

export default (ObjectsListView as unknown) as typeof ObjectsListViewDec

export { styles }
