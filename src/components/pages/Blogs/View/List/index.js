import React from 'react'

import { withStyles } from 'material-ui/styles'

// import gql from 'graphql-tag';

import { styles, TableView } from '../../../../view/List'

class BlogsPageView extends TableView {
  static defaultProps = {
    ...TableView.defaultProps,
    title: 'Блоги',
  }

  getColumns() {
    const { UserLink, BlogLink } = this.context

    return [
      {
        id: 'name',
        label: 'Название',
        renderer: (value, record) => {
          return record ? <BlogLink object={record} /> : null
        },
      },
      {
        id: 'CreatedBy',
        label: 'Автор',
        renderer: (value) => {
          return value ? <UserLink user={value} /> : null
        },
      },
    ]
  }
}

export default withStyles(styles)((props) => <BlogsPageView {...props} />)
