import React from 'react'

import gql from 'graphql-tag'

import { graphql } from '@apollo/client'

import {
  TimerNoNestingFragment,
  UserNoNestingFragment,
  TaskNoNestingFragment,
  ProjectNoNestingFragment,
} from '../../../../schema/generated/api.fragments'

export const createTimerProcessor = gql`
  mutation createTimerProcessor($data: TimerCreateInput!) {
    response: createTimerProcessor(data: $data) {
      success
      message
      errors {
        key
        message
      }
      data {
        ...TimerNoNesting
      }
    }
  }

  ${TimerNoNestingFragment}
`

export const updateTimerProcessor = gql`
  mutation updateTimerProcessor(
    $data: TimerUpdateInput!
    $where: TimerWhereUniqueInput!
  ) {
    response: updateTimerProcessor(data: $data, where: $where) {
      success
      message
      errors {
        key
        message
      }
      data {
        ...TimerNoNesting
      }
    }
  }

  ${TimerNoNestingFragment}
`

export const timerFragment = `
  fragment timerFragment on Timer{
    ...TimerNoNesting

    CreatedBy{
      ...UserNoNesting
    }

    Task {
      ...TaskNoNesting

      Project{
        ...ProjectNoNesting
        Resource{
          id
          uri
        }
      }
    }
    
  }
  
  ${TimerNoNestingFragment}
  ${UserNoNestingFragment}
  ${TaskNoNestingFragment}
  ${ProjectNoNestingFragment}
`

export const timersListFragment = `
  fragment timersListFragment on Timer{
    ...timerFragment
  }

  ${timerFragment}
`

export const timersConnectionQuery = gql`
  query timersConnection(
    $first: Int!
    $skip: Int
    $where: TimerWhereInput
    $orderBy: TimerOrderByInput!
  ) {
    objectsConnection: timersConnection(
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
          ...timersListFragment
        }
      }
    }
  }

  ${timersListFragment}
`

export const timerQuery = gql`
  query timer($where: TimerWhereUniqueInput!) {
    object: timer(where: $where) {
      ...timerFragment
    }
  }

  ${timerFragment}
`

const TimersQuery = graphql(timersConnectionQuery)
export const TimersConnector = TimersQuery((props) => {
  const { View, ...other } = props

  return <View {...other} />
})

const TimerQuery = graphql(timerQuery)
export const Timer = TimerQuery((props) => {
  const { View, ...other } = props

  return <View {...other} />
})
