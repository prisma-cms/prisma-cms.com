import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'

// import gql from 'graphql-tag';

import { styles, TableView } from '../../../../view/List'

class BlogsPageView extends TableView {
  static defaultProps = {
    ...TableView.defaultProps,
    title: 'Блоги',
  }

  getColumns() {
    const {
      ChatMessageLink,
      ChatRoomLink,
      UserLink,
      Grid,
      BlogLink,
    } = this.context

    return [
      // {
      //   id: "id",
      // },
      // {
      //   id: "id",
      //   label: "ID сообщения",
      //   renderer: (value, record) => {

      //     return record ? <ChatMessageLink
      //       object={record}
      //     /> : null;
      //   },
      // },
      {
        id: 'name',
        label: 'Название',
        renderer: (value, record) => {
          return record ? <BlogLink object={record} /> : null
        },
      },
      {
        id: 'CreatedBy',
        label: 'Автор',
        renderer: (value) => {
          return value ? <UserLink user={value} /> : null
        },
      },
    ]
  }

  // renderContent() {

  //   const {
  //     data: {
  //       loading,
  //       objectsConnection,
  //     },
  //     classes,
  //   } = this.props;

  //   const {
  //     Grid,
  //     query: {
  //       updateChatMessageProcessor,
  //     },
  //   } = this.context;

  //   let messages = objectsConnection && objectsConnection.edges.map(({ node }) => node) || [];

  //   let messagesList = <Grid
  //     container
  //   >
  //     {messages.map(n => {

  //       return <Grid
  //         key={n.id}
  //         item
  //         xs={12}
  //       >
  //         <ChatMessage
  //           data={{
  //             object: n,
  //           }}
  //           mutate={props => {

  //             return this.mutate({
  //               mutation: gql(updateChatMessageProcessor),
  //               ...props
  //             });
  //           }}
  //         />
  //       </Grid>

  //     })}
  //   </Grid>

  //   return <div
  //     className={classes.root}
  //   >
  //     {messagesList}
  //   </div>;

  // }
}

export default withStyles(styles)((props) => <BlogsPageView {...props} />)
