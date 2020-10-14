import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { styles, TableView } from 'apollo-cms/lib/DataView/List/Table'

import withStyles from 'material-ui/styles/withStyles'
// import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'

import Pagination from '@prisma-cms/front/lib/components/Pagination'

const customStyles = () => {
  return {
    ...styles,
    root: {
      '#root &': {
        border: 0,
        boxShadow: 'none',

        '& table': {
          '& thead, tbody': {
            '& td, th': {
              padding: '4px 20px',
            },
          },
          '& thead': {
            '& th': {
              textAlign: 'center',
            },
          },
          '& tbody': {
            '& tr': {
              '&:hover': {
                backgroundColor: 'transparent',
              },
            },
          },
        },
      },
    },
    loading: {
      // https://modxclub.ru/tasks/cjquq4m5o2eah0989chqx3m3d/
      // opacity: 0.5,
    },
  }
}

class ObjectsListView extends TableView {
  static propTypes = {
    ...TableView.propTypes,
    withPagination: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    ...TableView.defaultProps,
    withPagination: true,
    columnData: [],
    limit: 0,
  }

  getColumns() {
    const { columnData } = this.props

    return [
      {
        id: 'id',
      },
    ].concat(columnData)
  }

  render() {
    const { page, withPagination, data } = this.props

    const {
      objectsConnection,
      // loading,
      variables,
    } = data || {}

    const { edges, aggregate } = objectsConnection || {}
    const { first: limit } = variables || {}

    const { count = 0 } = aggregate || {}

    if (!edges || !edges.length) {
      // if (loading) {
      //   return null;
      // }
      // else {
      //   content = <Typography>
      //     Данные не были получены
      //   </Typography>
      // }
    }

    return (
      <Fragment>
        {super.render()}

        {withPagination ? (
          <Grid container spacing={0}>
            {edges && edges.length ? (
              <Grid item xs={12}>
                <Pagination
                  limit={limit || 0}
                  total={count}
                  page={page || 1}
                  style={{
                    marginTop: 20,
                  }}
                />
              </Grid>
            ) : null}
          </Grid>
        ) : null}
      </Fragment>
    )
  }
}

// export { customStyles as styles, ObjectsListView as TableView }
export { customStyles as styles, ObjectsListView }

export default withStyles(customStyles)(
  (ObjectsListView as unknown) as React.FC
)
