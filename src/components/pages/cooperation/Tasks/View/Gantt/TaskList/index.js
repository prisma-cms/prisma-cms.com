import React from 'react'

import { TaskList } from '@prisma-cms/react-timeline-gantt'
import withStyles from 'material-ui/styles/withStyles'

// import Row from "./Row";

import TaskView from '../../../../Tasks/View/Task'

import { updateTaskProcessor } from '../../../query'
import { compose, graphql } from '@apollo/client'

const styles = {}

class TaskListCustom extends TaskList {
  // static propTypes = {

  // };

  // render() {
  //   return (
  //     <div>
  //       efef
  //     </div>
  //   );
  // }

  // renderTaskRow(data) {

  //   const {
  //     mutate,
  //     selectedItem,
  //   } = this.props;

  //   let rows = data.map(n => {

  //     const {
  //       id,
  //     } = n;

  //     return <Row
  //       key={id}
  //       data={{
  //         object: n,
  //       }}
  //       mutate={mutate}
  //     />

  //   });

  //   return rows;
  // }

  renderTaskRow() {
    let output = null

    // return null;

    const { selectedItem, mutate } = this.props

    if (selectedItem) {
      // output = <Row
      output = (
        <TaskView
          data={{
            object: selectedItem,
          }}
          mutate={mutate}
        />
      )
    }

    return output
  }
}

// export default withStyles(styles)(props => <TaskListCustom {...props}/>);

export default compose(
  // graphql(createTaskProcessor, {
  //   name: "createTask",
  // }),
  graphql(updateTaskProcessor, {
    // name: "updateTask",
  })
)(withStyles(styles)((props) => <TaskListCustom {...props} />))
