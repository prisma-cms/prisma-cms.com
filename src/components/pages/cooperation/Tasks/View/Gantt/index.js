import React from 'react'

import { withStyles } from 'material-ui'

import {
  styles,
  GanttView as PrismaCooperationGanttView,
  GanttPageConnector,
} from '@prisma-cms/cooperation/lib/components/pages/Tasks/View/Gantt'

class GanttView extends PrismaCooperationGanttView {
  static defaultProps = {
    ...PrismaCooperationGanttView.defaultProps,
  }

  state = {
    ...super.state,
  }

  async componentDidMount() {
    const { data } = this.props

    if (data && !data.loading) {
      ;(await data.refetch) && data.refetch()
    }

    super.componentDidMount && super.componentDidMount()
  }
}

export default withStyles(styles)((props) => (
  <GanttPageConnector View={GanttView} {...props} />
))
