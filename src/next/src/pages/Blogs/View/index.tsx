import React from 'react'
import { ObjectsListView, styles } from 'src/components/view/List'

import withStyles from 'material-ui/styles/withStyles'
import { BlogsViewProps } from './interfaces'
import { ColumnConfig } from 'apollo-cms/lib/DataView/List/Table'
import { BlogsConnectionResourceFragment } from 'src/modules/gql/generated'
import UserLink from 'src/next/src/components/ui/Link/User'

class BlogsView<
  P extends BlogsViewProps = BlogsViewProps
> extends ObjectsListView<P> {
  static defaultProps = {
    ...ObjectsListView.defaultProps,
    title: 'Блоги',
  }

  getColumns<CC extends BlogsConnectionResourceFragment>(): ColumnConfig<CC>[] {
    return [
      {
        id: 'name',
        key: 'name',
        label: 'Название',
      },
      {
        id: 'CreatedBy',
        key: 'CreatedBy',
        label: 'Автор',
        renderer: (value: CC['CreatedBy']) => {
          return <UserLink user={value} />
        },
      },
    ]
  }
}

export default withStyles(styles)((props: BlogsViewProps) => (
  <BlogsView {...props} />
))
