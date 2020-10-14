import React from 'react'

import {
  ResourceNoNestingFragment,
  UserNoNestingFragment,
} from '../../../schema/generated/api.fragments'

import gql from 'graphql-tag'

import { graphql } from '@apollo/client'

export const resourceFragment = `
  fragment resourceFragment on Resource{
    ...ResourceNoNesting

    CreatedBy{
      ...UserNoNesting
    }

    CommentTarget{
      id
      name
      uri
    }
    
  }
  
  ${ResourceNoNestingFragment}
  ${UserNoNestingFragment}
`
// parent
// Topic{
//   id
//   uri
//   name
// }

export const resourcesListFragment = `
  fragment resourcesListFragment on Resource{
    ...resourceFragment
  }

  ${resourceFragment}
`

export const resourcesConnectionQuery = gql`
  query resourcesConnection(
    $first: Int!
    $skip: Int
    $where: ResourceWhereInput
    $orderBy: ResourceOrderByInput!
  ) {
    objectsConnection: resourcesConnection(
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
          ...resourcesListFragment
        }
      }
    }
  }

  ${resourcesListFragment}
`

export const resourceQuery = gql`
  query resource($where: ResourceWhereUniqueInput!) {
    object: resource(where: $where) {
      ...resourceFragment
    }
  }

  ${resourceFragment}
`

const ResourcesQuery = graphql(resourcesConnectionQuery, {
  options: (props) => {
    const { where, ...other } = props

    return {
      variables: {
        ...other,
        where: {
          ...where,
          type: 'Comment',
        },
      },
    }
  },
})

export const CommentsConnector = ResourcesQuery((props) => {
  const { View, ...other } = props

  return <View {...other} />
})

const ResourceQuery = graphql(resourceQuery)

export const Comment = ResourceQuery((props) => {
  const { View, ...other } = props

  return <View {...other} />
})
