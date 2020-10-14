import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import PrismaCmsComponent from "@prisma-cms/component";
import Context from '@prisma-cms/context'

// import gql from "graphql-tag";

import View from './view'

import { TopicsConnector } from '../../pages/Topics/query'

export class ForumConnector extends Component {
  static propTypes = {
    View: PropTypes.func.isRequired,
    first: PropTypes.number.isRequired,
    orderBy: PropTypes.string.isRequired,
    tagName: PropTypes.string,
    where: PropTypes.object,
    getCommentsText: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    View,
    first: 12,
    // where: null,
    orderBy: 'updatedAt_DESC',
    getCommentsText: false,
  }

  static contextType = Context

  constructor(props) {
    super(props)
  }

  setFilters(filters) {
    const {
      uri,
      router: { history },
    } = this.context

    let newUri = uri.clone()

    try {
      filters = filters ? JSON.stringify(filters) : undefined
    } catch (error) {
      console.error(error)
    }

    if (filters) {
      if (newUri.hasQuery) {
        newUri = newUri.setQuery({
          filters,
        })
      } else {
        newUri = newUri.addQuery({
          filters,
        })
      }
    } else {
      newUri.removeQuery('filters')
    }

    newUri.removeQuery('page')

    const url = newUri.resource()

    history.push(url)
  }

  render() {
    const { first, tagName, where: propsWhere, ...other } = this.props

    const { uri } = this.context

    let { page, filters } = uri.query(true)

    try {
      filters = (filters && JSON.parse(filters)) || null
    } catch (error) {
      console.error(console.error(error))
    }

    let skip

    page = (page && parseInt(page)) || 0

    if (first && page > 1) {
      skip = (page - 1) * first
    }

    const AND = []

    if (propsWhere) {
      AND.push(propsWhere)
    }

    if (tagName) {
      AND.push({
        tag: tagName,
      })
    }

    if (filters) {
      AND.push(filters)
    }

    const where = {
      type: 'Topic',
      AND,
    }

    return (
      <TopicsConnector
        first={first}
        skip={skip}
        page={page}
        where={where}
        filters={filters || {}}
        setFilters={(filters) => this.setFilters(filters)}
        {...other}
      />
    )
  }
}

export default ForumConnector
