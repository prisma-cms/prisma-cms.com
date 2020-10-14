import React from 'react'

import gql from 'graphql-tag'

import { graphql } from '@apollo/client'

import {
  ProjectNoNestingFragment,
  UserNoNestingFragment,
  TaskNoNestingFragment,
  TimerNoNestingFragment,
  ProjectTaskNoNestingFragment,
} from '../../../../schema/generated/api.fragments'

export const createProjectProcessor = gql`
  mutation createProjectProcessor($data: ProjectCreateInput!) {
    response: createProjectProcessor(data: $data) {
      success
      message
      errors {
        key
        message
      }
      data {
        ...ProjectNoNesting
        Resource {
          id
          uri
        }
      }
    }
  }

  ${ProjectNoNestingFragment}
`

export const updateProjectProcessor = gql`
  mutation updateProjectProcessor(
    $data: ProjectUpdateInput!
    $where: ProjectWhereUniqueInput!
  ) {
    response: updateProjectProcessor(data: $data, where: $where) {
      success
      message
      errors {
        key
        message
      }
      data {
        ...ProjectNoNesting
      }
    }
  }

  ${ProjectNoNestingFragment}
`

export const projectFragment = `
  fragment projectFragment on Project{
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
    
    ProjectTasks {
      ...ProjectTaskNoNesting
      Task{
        ...TaskNoNesting
        CreatedBy{
          ...UserNoNesting
        }
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

export const projectsListFragment = `
  fragment projectsListFragment on Project{
    ...projectFragment
  }

  ${projectFragment}
`

export const projectsConnectionQuery = gql`
  query projectsConnection(
    $first: Int!
    $skip: Int
    $where: ProjectWhereInput
    $orderBy: ProjectOrderByInput!
  ) {
    objectsConnection: projectsConnection(
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
          ...projectsListFragment
        }
      }
    }
  }

  ${projectsListFragment}
`

export const projectQuery = gql`
  query project($where: ProjectWhereUniqueInput!) {
    object: project(where: $where) {
      ...projectFragment
    }
  }

  ${projectFragment}
`

export const projectResourceQuery = gql`
  query project($where: ResourceWhereUniqueInput!) {
    object: resource(where: $where) {
      id
      name
      uri
      type
      Project {
        ...projectFragment
      }
    }
  }

  ${projectFragment}
`

const ProjectsQuery = graphql(projectsConnectionQuery)
export const ProjectsConnector = ProjectsQuery((props) => {
  const { View, ...other } = props

  return <View {...other} />
})

const ProjectQuery = graphql(projectQuery)
export const Project = ProjectQuery((props) => {
  const { View, ...other } = props

  return <View {...other} />
})

const ProjectResourceQuery = graphql(projectResourceQuery)
export const ProjectResource = ProjectResourceQuery((props) => {
  const { View, ...other } = props

  return <View {...other} />
})
