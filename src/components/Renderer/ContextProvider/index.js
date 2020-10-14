import React, { Component } from 'react'

import Context from '@prisma-cms/context'

import * as UI from '@modxclub/ui'

class ContextProvider extends Component {
  static contextType = Context

  render() {
    const { children } = this.props

    const { query } = this.context

    Object.assign(this.context, {
      query: {
        ...query,
        ...this.prepareQuery(),
      },
      // query: query ? Object.assign(query, {
      //   ...this.prepareQuery(),
      // }) : query,
      ...UI,
    })

    return (
      <Context.Provider value={this.context}>
        {children || null}
      </Context.Provider>
    )
  }

  prepareQuery() {
    return {
      ...this.prepareUserQuery(),
      ...this.prepareResourcesQuery(),
      ...this.prepareTaskQuery(),
      ...this.prepareTimerQuery(),
      ...this.prepareProjectQuery(),
    }
  }

  prepareUserQuery() {
    const { queryFragments } = this.context

    const {
      UserNoNestingFragment,
      EthAccountNoNestingFragment,
      NotificationTypeNoNestingFragment,
      ProjectNoNestingFragment,
      ProjectMemberNoNestingFragment,
      ResourceNoNestingFragment,
      BatchPayloadNoNestingFragment,
    } = queryFragments

    const userFragment = `
      fragment user on User {
        ...UserNoNesting
        EthAccounts{
          ...EthAccountNoNesting
        }
        NotificationTypes{
          ...NotificationTypeNoNesting
        }
        Projects{
          ...ProjectMemberNoNesting
          Project{
            ...ProjectNoNesting
            Resource{
              ...ResourceNoNesting
            }
          }
        }
        ProjectsCreated{
          ...ProjectNoNesting
          Resource{
            ...ResourceNoNesting
          }
        }
      }

      ${UserNoNestingFragment}
      ${EthAccountNoNestingFragment}
      ${NotificationTypeNoNestingFragment}
      ${ProjectNoNestingFragment}
      ${ProjectMemberNoNestingFragment}
      ${ResourceNoNestingFragment}
    `

    const usersConnection = `
      query usersConnection (
        $where: UserWhereInput
        $orderBy: UserOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objectsConnection: usersConnection (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          aggregate{
            count
          }
          edges{
            node{
              ...user
            }
          }
        }
      }

      ${userFragment}
    `

    const users = `
      query users (
        $where: UserWhereInput
        $orderBy: UserOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objects: users (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          ...user
        }
      }

      ${userFragment}
    `

    const user = `
      query user (
        $where: UserWhereUniqueInput!
      ){
        object: user(
          where: $where
        ){
          ...user
        }
      }

      ${userFragment}
    `

    const createUserProcessor = `
      mutation createUserProcessor(
        $data: UserCreateInput!
      ) {
        response: createUserProcessor(
          data: $data
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...user
          }
        }
      }

      ${userFragment}
    `

    const updateUserProcessor = `
      mutation updateUserProcessor(
        $data: UserUpdateInput!
        $where: UserWhereUniqueInput
      ) {
        response: updateUserProcessor(
          data: $data
          where: $where
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...user
          }
        }
      }

      ${userFragment}
    `

    const deleteUser = `
      mutation deleteUser (
        $where: UserWhereUniqueInput!
      ){
        deleteUser(
          where: $where
        ){
          ...UserNoNesting
        }
      }
      ${UserNoNestingFragment}
    `

    const deleteManyUsers = `
      mutation deleteManyUsers (
        $where: UserWhereInput
      ){
        deleteManyUsers(
          where: $where
        ){
          ...BatchPayloadNoNesting
        }
      }
      ${BatchPayloadNoNestingFragment}
    `

    return {
      usersConnection,
      users,
      user,
      createUserProcessor,
      updateUserProcessor,
      deleteUser,
      deleteManyUsers,
    }
  }

  prepareResourcesQuery() {
    const {
      queryFragments: { ResourceNoNestingFragment, UserNoNestingFragment },
    } = this.context

    const blogFragment = `
      fragment blog on Resource{
        ...ResourceNoNesting
        CreatedBy{
          ...UserNoNesting
        }
      }
      ${ResourceNoNestingFragment}
      ${UserNoNestingFragment}
    `

    const createBlogProcessor = `
      mutation createBlogProcessor(
        $data: BlogCreateInput!
      ){
        response: createBlogProcessor(
          data: $data
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...blog
          }
        }
      }

      ${blogFragment}
    `

    const updateBlogProcessor = `
      mutation updateBlogProcessor(
        $data: BlogUpdateInput!
        $where: ResourceWhereUniqueInput!
      ){
        response: updateBlogProcessor(
          data: $data
          where: $where
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...blog
          }
        }
      }

      ${blogFragment}
    `

    return {
      createBlogProcessor,
      updateBlogProcessor,
    }
  }

  prepareTaskQuery() {
    const { queryFragments } = this.context

    const {
      TaskNoNestingFragment,
      TaskReactionNoNestingFragment,
      UserNoNestingFragment,
      TimerNoNestingFragment,
      ProjectNoNestingFragment,
      ProjectTaskNoNestingFragment,
    } = queryFragments

    const TaskFragment = `
      fragment Task on Task{
        ...TaskNoNesting

        CreatedBy{
          ...UserNoNesting
        }

        Timers(
          orderBy: createdAt_DESC
        ){
          ...TimerNoNesting
          CreatedBy{
            ...UserNoNesting
          }
        }

        TaskProjects{
          ...ProjectTaskNoNesting
          Project{
            ...ProjectNoNesting
            CreatedBy{
              ...UserNoNesting
            }
            Resource{
              id
              name
              uri
            }
          }
        }

        RelatedTo{
          ...TaskNoNesting
        }

        Reactions{
          ...TaskReactionNoNesting
          CreatedBy{
            ...UserNoNesting
          }
        }
        
      }
      
      ${TaskNoNestingFragment}
      ${TaskReactionNoNestingFragment}
      ${UserNoNestingFragment}
      ${TimerNoNestingFragment}
      ${ProjectNoNestingFragment}
      ${ProjectTaskNoNestingFragment}
    `

    const tasksConnection = `
      query tasksConnection (
        $where: TaskWhereInput
        $orderBy: TaskOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objectsConnection: tasksConnection (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          aggregate{
            count
          }
          edges{
            node{
              ...Task
            }
          }
        }
      }

      ${TaskFragment}
    `

    const tasks = `
      query tasks (
        $where: TaskWhereInput
        $orderBy: TaskOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objects: tasks (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          ...Task
        }
      }

      ${TaskFragment}
    `

    const task = `
      query task (
        $where: TaskWhereUniqueInput!
      ){
        object: task (
          where: $where
        ){
          ...Task
        }
      }

      ${TaskFragment}
    `

    const createTaskProcessor = `
      mutation createTaskProcessor(
        $data: TaskCreateInput!
      ) {
        response: createTaskProcessor(
          data: $data
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...Task
          }
        }
      }

      ${TaskFragment}
    `

    const updateTaskProcessor = `
      mutation updateTaskProcessor(
        $data: TaskUpdateInput!
        $where: TaskWhereUniqueInput!
      ) {
        response: updateTaskProcessor(
          data: $data
          where: $where
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...Task
          }
        }
      }

      ${TaskFragment}
    `

    const taskStatusEnum = `
      query {
        objects: __type(
          name: "TaskStatus"
        ){
          values: enumValues{
            name
            description
          }
        }
      }
    `

    return {
      tasksConnection,
      tasks,
      task,
      createTaskProcessor,
      updateTaskProcessor,
      taskStatusEnum,
    }
  }

  prepareTimerQuery() {
    const { queryFragments } = this.context

    const {
      TimerNoNestingFragment,
      UserNoNestingFragment,
      TaskNoNestingFragment,
      ProjectNoNestingFragment,
      ResourceNoNestingFragment,
      ProjectTaskNoNestingFragment,
    } = queryFragments

    const TimerFragment = `
      fragment Timer on Timer{
        ...TimerNoNesting
    
        CreatedBy{
          ...UserNoNesting
        }
    
        Task {
          ...TaskNoNesting

          TaskProjects {
            ...ProjectTaskNoNesting
            Project{
              ...ProjectNoNesting
              Resource{
                ...ResourceNoNesting
              }
            }
          }
    
    
          CreatedBy{
            ...UserNoNesting
          }
        }
        
      }
      
      ${TimerNoNestingFragment}
      ${UserNoNestingFragment}
      ${TaskNoNestingFragment}
      ${ProjectNoNestingFragment}
      ${ResourceNoNestingFragment}
      ${ProjectTaskNoNestingFragment}
    `

    const timersConnection = `
      query timersConnection (
        $where: TimerWhereInput
        $orderBy: TimerOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objectsConnection: timersConnection (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          aggregate{
            count
          }
          edges{
            node{
              ...Timer
            }
          }
        }
      }

      ${TimerFragment}
    `

    const timers = `
      query timers (
        $where: TimerWhereInput
        $orderBy: TimerOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objects: timers (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          ...Timer
        }
      }

      ${TimerFragment}
    `

    const timer = `
      query timer (
        $where: TimerWhereUniqueInput!
      ){
        object: timer (
          where: $where
        ){
          ...Timer
        }
      }

      ${TimerFragment}
    `

    const createTimerProcessor = `
      mutation createTimerProcessor(
        $data: TimerCreateInput!
      ) {
        response: createTimerProcessor(
          data: $data
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...Timer
          }
        }
      }

      ${TimerFragment}
    `

    const updateTimerProcessor = `
      mutation updateTimerProcessor(
        $data: TimerUpdateInput!
        $where: TimerWhereUniqueInput!
      ) {
        response: updateTimerProcessor(
          data: $data
          where: $where
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...Timer
          }
        }
      }

      ${TimerFragment}
    `

    return {
      timersConnection,
      timers,
      timer,
      createTimerProcessor,
      updateTimerProcessor,
    }
  }

  prepareProjectQuery() {
    const { queryFragments } = this.context

    const {
      ProjectNoNestingFragment,
      UserNoNestingFragment,
      TaskNoNestingFragment,
      TimerNoNestingFragment,
      ProjectTaskNoNestingFragment,
    } = queryFragments

    const ProjectFragment = `fragment Project on Project {
      ...ProjectNoNesting

      CreatedBy{
        ...UserNoNesting
      }
  
      Members{
        id
        User{
          ...UserNoNesting
        }
      }

      ProjectTasks{
        ...ProjectTaskNoNesting
        Task{
          ...TaskNoNesting
          Timers(
            where:{
              stopedAt: null
            }
          ){
            ...TimerNoNesting
            CreatedBy{
              ...UserNoNesting
            }
          }
          CreatedBy{
            ...UserNoNesting
          }
          Parent {
            ...TaskNoNesting
          }
        }
      }
      
      
      Resource{
        id
        uri
        Image{
          id
          path
        }
      }

    }
    
      ${ProjectNoNestingFragment}
      ${UserNoNestingFragment}
      ${TaskNoNestingFragment}
      ${TimerNoNestingFragment}
      ${ProjectTaskNoNestingFragment}
    `

    const projectsConnection = `
      query projectsConnection (
        $where: ProjectWhereInput
        $orderBy: ProjectOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objectsConnection: projectsConnection (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          aggregate{
            count
          }
          edges{
            node{
              ...Project
            }
          }
        }
      }

      ${ProjectFragment}
    `

    const projects = `
      query projects (
        $where: ProjectWhereInput
        $orderBy: ProjectOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objects: projects (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          ...Project
        }
      }

      ${ProjectFragment}
    `

    const project = `
      query project (
        $where: ProjectWhereUniqueInput!
      ){
        object: project (
          where: $where
        ){
          ...Project
        }
      }

      ${ProjectFragment}
    `

    const createProjectProcessor = `
      mutation createProjectProcessor(
        $data: ProjectCreateInput!
      ) {
        response: createProjectProcessor(
          data: $data
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...Project
          }
        }
      }

      ${ProjectFragment}
    `

    const updateProjectProcessor = `
      mutation updateProjectProcessor(
        $data: ProjectUpdateInput!
        $where: ProjectWhereUniqueInput!
      ) {
        response: updateProjectProcessor(
          data: $data
          where: $where
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...Project
          }
        }
      }

      ${ProjectFragment}
    `

    return {
      projectsConnection,
      projects,
      project,
      createProjectProcessor,
      updateProjectProcessor,
    }
  }
}

export default ContextProvider
