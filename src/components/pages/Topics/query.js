
import React from "react";

import gql from "graphql-tag";

// TODO: react-apollo does not export those any more
import { graphql, compose } from "react-apollo";


import {
  ResourceNoNestingFragment,
  UserNoNestingFragment,
} from "../../../schema/generated/api.fragments";


export const topicFragment = `
  fragment topicFragment on Resource{
    ...ResourceNoNesting
    CreatedBy{
      ...UserNoNesting
    }
    Comments(
      orderBy: id_ASC
    ){
      id
      uri
      createdAt
      updatedAt
      content @include(if:$getCommentsText)
      CreatedBy{
        ...UserNoNesting
      }
    }
    Blog{
      id
      name
      longtitle
      uri
    }
    Tags{
      Tag{
        id
        name
      }
    }
  }
 

  ${ResourceNoNestingFragment}
  ${UserNoNestingFragment}
`


export const topicsListFragment = `
  fragment topicsListFragment on Resource{
    ...topicFragment
  }

  ${topicFragment}
`;


export const topicsFullFragment = `
  fragment topicsFullFragment on Resource{
    ...topicFragment
    content
  }

  ${topicFragment}
`;


export const topicsConnectionQuery = gql`

  query topicsConnection(
    $first:Int!
    $skip:Int
    $where:  ResourceWhereInput
    $orderBy:  ResourceOrderByInput!
    $getCommentsText:Boolean = false
  ){
    objectsConnection: resourcesConnection(
      orderBy: $orderBy
      first: $first
      skip: $skip
      where: $where
    ){
      aggregate{
        count
      }
      edges{
        node{
          ...topicsListFragment
        }
      }
    }
  }

  ${topicsListFragment}

`;


export const topicQuery = gql`

  query topic(
    $where: ResourceWhereUniqueInput!
    $getCommentsText:Boolean = true
  ){
    object: resource(
      where: $where
    ){ 
      ...topicsFullFragment
    }
  }

  ${topicsFullFragment}

`;


export const createTopicProcessor = gql`
 

  mutation createTopicProcessor(
    $data:TopicCreateInput!
    $getCommentsText:Boolean = true
  ){
    response: createTopicProcessor(
      data: $data
    ){
      success
      message
      errors{
        key
        message
      }
      data{
        ...topicsFullFragment
      }
    }
  }

  ${topicsFullFragment}

`;


export const updateTopicProcessor = gql`
 

  mutation updateTopicProcessor(
    $data: TopicUpdateInput!
    $where: ResourceWhereUniqueInput!
    $getCommentsText:Boolean = true
  ){
    response: updateTopicProcessor(
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
        ...topicsFullFragment
      }
    }
  }

  ${topicsFullFragment}

`;




const TopicsQuery = graphql(topicsConnectionQuery);

export const TopicsConnector = TopicsQuery(props => {

  const {
    View,
    ...other
  } = props;

  return <View
    {...other}
  />;
});


const TopicQuery = compose(graphql(topicQuery), graphql(updateTopicProcessor));


export const TopicConnector = TopicQuery(props => {

  const {
    View,
    ...other
  } = props;

  return <View
    {...other}
  />;
});


