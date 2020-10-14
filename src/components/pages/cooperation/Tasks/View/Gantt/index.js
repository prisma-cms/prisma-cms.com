import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui'

// import moment from "moment";

// import TimeLine from "@prisma-cms/react-timeline-gantt";
// import TaskList from "./TaskList";
// import DataTask from "./DataTask";

import {
  styles,
  GanttView as PrismaCooperationGanttView,
  // processors,
  GanttPageConnector,
} from '@prisma-cms/cooperation/lib/components/pages/Tasks/View/Gantt'

// import * as Gannt from "@prisma-cms/cooperation/lib/components/pages/Tasks/View/Gantt";

// import { graphql, compose } from '@apollo/client';

// import {
//   Task as TaskQuery,
//   createTaskProcessor,
//   updateTaskProcessor,
// } from "../../query";

// const UpdateTask = graphql(updateTaskProcessor)(TaskView);
// const CreateTask = graphql(createTaskProcessor)(TaskView);

// const styles = {
//   root: {
//     "fontFamily": "Helvetica, Arial, sans-serif",
//     "height": "100%",
//     "margin": "0",
//     // border: "1px solid green",

//     "& canvas": {
//       "fontFamily": "Helvetica, Arial, sans-serif",
//       "height": "100%",
//       "margin": "0"
//     },
//     "& #routeContainer": {
//       "fontFamily": "Helvetica, Arial, sans-serif",
//       "height": "100%",
//       "margin": "0"
//     },
//     "& .app-container": {
//       "display": "flex",
//       "flexDirection": "column",
//       "justifyContent": "flex-start",
//       "alignItems": "center",
//       "width": "100%",
//       "height": "100%"
//     },
//     "& .time-line-container": {
//       "display": "flex",
//       "flexDirection": "column",
//       "justifyContent": "flex-start",
//       "alignItems": "center",
//       "width": "100%",
//       "height": "100%",
//       // "margin": "10px"
//     }
//   },
// }

class GanttView extends PrismaCooperationGanttView {
  // static propTypes = {

  // }

  static defaultProps = {
    ...PrismaCooperationGanttView.defaultProps,
    // DataTask,
  }

  // static contextTypes = {
  //   // client: PropTypes.object.isRequired,
  //   user: PropTypes.object,
  // }

  state = {
    ...super.state,
    // daysWidth: 1,
    // itemheight: 1,
  }

  // onSelectItem = (item) => {
  //   this.setState({ selectedItem: item })
  // }

  // onUpdateTask = async (item, props) => {

  //   let {
  //     start,
  //     end,
  //   } = props;

  //   const {
  //     id,
  //     CreatedBy: {
  //       id: createdById,
  //     },
  //   } = item;

  //   let {
  //     updateTask,
  //   } = this.props;

  //   const {
  //     // client,
  //     user: currentUser,
  //   } = this.context;

  //   const {
  //     id: currentUserId,
  //   } = currentUser || {};

  //   if (currentUserId !== createdById) {
  //     return;
  //   }

  //   let startDatePlaning = moment(start);
  //   let endDatePlaning = moment(end);

  //   let data = {
  //     startDatePlaning,
  //   };

  //   if (endDatePlaning > startDatePlaning) {
  //     data.endDatePlaning = endDatePlaning;
  //   }

  //   await updateTask({
  //     variables: {
  //       data,
  //       where: {
  //         id,
  //       },
  //     },
  //   });

  // }

  // onCreateLink = (item) => {

  // }

  async componentDidMount() {
    const { data } = this.props

    if (data && !data.loading) {
      ;(await data.refetch) && data.refetch()
    }

    super.componentDidMount && super.componentDidMount()
  }

  // render() {

  //   const {
  //     classes,
  //     data: {
  //       objectsConnection,
  //     },
  //   } = this.props;

  //   const {
  //     selectedItem,
  //   } = this.state;

  //   let tasks = objectsConnection && objectsConnection.edges.map(({ node }) => node) || [];

  //   let tasksData = tasks.map(n => {

  //     let {
  //       id,
  //       name,
  //       createdAt,
  //       startDatePlaning,
  //       endDatePlaning,
  //       startDate,
  //       endDate,
  //       status,
  //     } = n;

  //     let start = moment(startDate || startDatePlaning || createdAt).toDate();
  //     let end = endDate || endDatePlaning;

  //     if (!end) {
  //     }
  //     else {
  //       end = moment(end).toDate();
  //     }

  //     return {
  //       ...n,
  //       id,
  //       name,
  //       start,
  //       end,
  //     }

  //   });

  //   let links = [];

  //   tasksData.map(n => {
  //     const {
  //       id: start,
  //       RelatedTo,
  //     } = n;

  //     RelatedTo && RelatedTo.map(({
  //       id: end,
  //     }) => {

  //       links.push({
  //         start,
  //         end,
  //       });

  //     });

  //   })

  //   const config = {
  //     taskList: {
  //       title: {
  //         label: "Задачи",
  //       },
  //     },
  //     dataViewPort: {
  //       task: {
  //         showLabel: true,
  //         style: {
  //           // borderRadius: 1,
  //           // boxShadow: '2px 2px 8px #888888',
  //           paddingLeft: 3,
  //           paddingRight: 3,
  //           cursor: "pointer",
  //         }
  //       }
  //     }
  //   }

  //   return <div
  //     className={classes.root}
  //   >

  //     <style
  //       dangerouslySetInnerHTML={{
  //         __html: `
  //           html{
  //             height: 100%;
  //           }
  //           body{
  //             height: 100%;
  //           }
  //           #root {
  //             height: 100%;
  //           }
  //         `,
  //       }}
  //     />

  //     <div className="time-line-container">
  //       <TimeLine
  //         TaskList={TaskList}
  //         DataTask={DataTask}
  //         data={tasksData}
  //         links={links}
  //         config={config}
  //         onUpdateTask={this.onUpdateTask}
  //         onCreateLink={this.onCreateLink}
  //         onSelectItem={this.onSelectItem}
  //         selectedItem={selectedItem ? tasksData && tasksData.find(n => n.id === selectedItem.id) : null}
  //       />
  //     </div>
  //   </div>
  //     ;
  // }
}

// export default compose(

//   graphql(createTaskProcessor, {
//     name: "createTask",
//   }),
//   graphql(updateTaskProcessor, {
//     name: "updateTask",
//   }),

// )(withStyles(styles)(props => <GanttView {...props}/>));

// export default processors(withStyles(styles)(props => <GanttView
//   {...props}
// />));

export default withStyles(styles)((props) => (
  <GanttPageConnector View={GanttView} {...props} />
))
