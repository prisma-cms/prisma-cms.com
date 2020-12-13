import React from 'react'
import { ObjectsListView, styles } from 'src/components/view/List'

import withStyles from 'material-ui/styles/withStyles'
import { TagsViewProps } from './interfaces'
import { ColumnConfig } from 'apollo-cms/dist/DataView/List/Table'
import { Tag_Fragment } from 'src/modules/gql/generated'
import UserLink from 'src/uikit/Link/User'
import Grid from 'src/uikit/Grid'
import Link from 'next/link'

class TagsView<
  P extends TagsViewProps = TagsViewProps
> extends ObjectsListView<P> {
  static defaultProps = {
    ...ObjectsListView.defaultProps,
    title: '',
  }

  getColumns<CC extends Tag_Fragment>(): ColumnConfig<CC>[] {
    return [
      {
        id: 'name',
        key: 'name',
        label: 'Тег',
        renderer: (value: CC['name'], record) => {
          if (!value || !record.id) {
            return null
          }

          return (
            <Link href={`/tag/${record.name}`}>
              <a title={record.name}>{record.name}</a>
            </Link>
          )
        },
      },
      {
        id: 'Resources',
        key: 'Resources',
        label: 'Ресурсы',
        renderer: (value: CC['Resources']) => {
          const items =
            value?.map((n) => (
              <Grid key={n.id} item>
                <Link href={n.Resource.uri}>
                  <a title={n.Resource.name}>{n.Resource.name}</a>
                </Link>
              </Grid>
            )) ?? []

          return (
            <Grid container spacing={8}>
              {items}
            </Grid>
          )
        },
      },
      {
        id: 'CreatedBy',
        key: 'CreatedBy',
        label: 'Кем создан',
        renderer: (value: CC['CreatedBy']) => {
          return <UserLink user={value} />
        },
      },
    ]
  }
}

export default withStyles(styles)((props: TagsViewProps) => (
  <TagsView {...props} />
))
