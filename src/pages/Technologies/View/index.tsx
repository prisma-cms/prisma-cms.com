import React from 'react'
import { ObjectsListView, styles } from 'src/components/view/List'

import withStyles from 'material-ui/styles/withStyles'
import { TechnologiesViewProps } from './interfaces'
import { ColumnConfig } from 'apollo-cms/dist/DataView/List/Table'
import { TechnologiesConnectionTechnologyFragment } from 'src/modules/gql/generated'
import UserLink from 'src/uikit/Link/User'
import Grid from 'src/uikit/Grid'
import Link from 'next/link'

class TechnologiesView<
  P extends TechnologiesViewProps = TechnologiesViewProps
> extends ObjectsListView<P> {
  static defaultProps = {
    ...ObjectsListView.defaultProps,
    title: '',
  }

  getColumns<
    CC extends TechnologiesConnectionTechnologyFragment
  >(): ColumnConfig<CC>[] {
    return [
      {
        id: 'name',
        key: 'name',
        label: 'Технология',
        renderer: (value: CC['name'], record) => {
          if (!value || !record.id) {
            return null
          }

          return (
            <Link href={`/technologies/${record.id}`}>
              <a title={value as string}>{value}</a>
            </Link>
          )
        },
      },
      {
        id: 'CreatedBy',
        key: 'CreatedBy',
        label: 'Кем добавлена',
        renderer: (value: CC['CreatedBy']) => {
          return <UserLink user={value} />
        },
      },
      {
        id: 'UserTechnologies',
        key: 'UserTechnologies',
        label: 'Кто использует',
        renderer: (value: CC['UserTechnologies']) => {
          const items =
            value?.map((n) => (
              <Grid key={n.id} item>
                <UserLink user={n.CreatedBy} />
              </Grid>
            )) ?? []

          return (
            <Grid container spacing={8}>
              {items}
            </Grid>
          )
        },
      },
    ]
  }
}

export default withStyles(styles)((props: TechnologiesViewProps) => (
  <TechnologiesView {...props} />
))
