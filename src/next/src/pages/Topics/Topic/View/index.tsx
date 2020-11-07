import React from 'react'

// import withStyles from 'material-ui/styles/withStyles'
// import { TopicViewProps } from './interfaces'
// import { ColumnConfig } from 'apollo-cms/lib/DataView/List/Table'
// import { TopicConnectionResourceFragment } from 'src/modules/gql/generated'
// import UserLink from 'src/next/src/components/ui/Link/User'
import EditableObject from 'apollo-cms/lib/DataView/Object/Editable'

class TopicView extends EditableObject {
  // static defaultProps = {
  //   ...ObjectsListView.defaultProps,
  //   title: 'Блоги',
  // }

  render() {
    // eslint-disable-next-line no-console
    // console.log("TopicView props", this.props);

    return <>Topic</>
  }
}

export default TopicView
