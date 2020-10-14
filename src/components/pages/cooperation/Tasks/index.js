import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// import CooperationTasksPage from "@prisma-cms/cooperation/lib/components/pages/Tasks";

import Page from '../../layout'
// import View from "./View/Gantt";

import { TasksPage as PrismaCmsTasksPage } from '@prisma-cms/cooperation'

export class TasksPage extends Page {
  render() {
    return super.render(<PrismaCmsTasksPage {...this.props} />)
  }
}

// export class TasksPage extends Page {

//   static propTypes = {
//     ...Page.propTypes,
//   };

//   static defaultProps = {
//     ...Page.defaultProps,
//     View,
//   }

//   render() {

//     let {
//       ...other
//     } = this.props;

//     return (<Fragment>

//       <style
//         dangerouslySetInnerHTML={{
//           __html: `
//             #root {
//               display: flex;
//               flex-direction: column;
//             }
//           `,
//         }}
//       />

//       <CooperationTasksPage
//         {...other}
//       />

//     </Fragment>);
//   }

// }

export default TasksPage
