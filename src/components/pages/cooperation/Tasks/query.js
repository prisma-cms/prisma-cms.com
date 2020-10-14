import React from 'react'

import gql from 'graphql-tag'

import { graphql, compose } from '@apollo/client'

import {
  TaskNoNestingFragment,
  UserNoNestingFragment,
  TimerNoNestingFragment,
  ProjectNoNestingFragment,
} from '../../../../schema/generated/api.fragments'

export const createTaskProcessor = gql`
  mutation createTaskProcessor($data: TaskCreateInput!) {
    response: createTaskProcessor(data: $data) {
      success
      message
      errors {
        key
        message
      }
      data {
        ...TaskNoNesting
      }
    }
  }

  ${TaskNoNestingFragment}
`

export const updateTaskProcessor = gql`
  mutation updateTaskProcessor(
    $data: TaskUpdateInput!
    $where: TaskWhereUniqueInput!
  ) {
    response: updateTaskProcessor(data: $data, where: $where) {
      success
      message
      errors {
        key
        message
      }
      data {
        ...TaskNoNesting
      }
    }
  }

  ${TaskNoNestingFragment}
`

export const taskFragment = `
  fragment taskFragment on Task{
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

    Project{
      ...ProjectNoNesting
      CreatedBy{
        ...UserNoNesting
      }
      Resource{
        id
        uri
      }
    }

    RelatedTo{
      ...TaskNoNesting
    }
    
  }
  
  ${TaskNoNestingFragment}
  ${UserNoNestingFragment}
  ${TimerNoNestingFragment}
  ${ProjectNoNestingFragment}
`

export const tasksListFragment = `
  fragment tasksListFragment on Task{
    ...taskFragment
  }

  ${taskFragment}
`

export const tasksConnectionQuery = gql`
  query tasksConnection(
    $first: Int!
    $skip: Int
    $where: TaskWhereInput
    $orderBy: TaskOrderByInput!
  ) {
    objectsConnection: tasksConnection(
      orderBy: $orderBy
      first: $first
      skip: $skip
      where: $where
    ) {
      aggregate {
        count
      }
      edges {
        node {
          ...tasksListFragment
        }
      }
    }
  }

  ${tasksListFragment}
`

export const taskQuery = gql`
  query task($where: TaskWhereUniqueInput!) {
    object: task(where: $where) {
      ...taskFragment
    }
  }

  ${taskFragment}
`

const TasksQuery = graphql(tasksConnectionQuery)
export const TasksConnector = TasksQuery((props) => {
  const { View, ...other } = props

  return <View {...other} />
})

const TaskQuery = graphql(taskQuery)
export const Task = TaskQuery((props) => {
  const { View, ...other } = props

  return <View {...other} />
})
