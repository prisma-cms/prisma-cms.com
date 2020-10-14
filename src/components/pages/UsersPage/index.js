import React from 'react'

import Page from '../layout'

import View from './View'

import PrismaCmsUsersPage from '@prisma-cms/front/lib/components/pages/UsersPage'

export class UsersPage extends PrismaCmsUsersPage {
  static defaultProps = {
    ...PrismaCmsUsersPage.defaultProps,
    View,
  }

  setPageMeta(meta) {
    return super.setPageMeta(
      meta || {
        title: 'Участники',
      }
    )
  }
}

export default class extends Page {
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
    const { uri } = this.context

    const { where: propsWhere, ...other } = this.props

    let { filters } = uri.query(true)

    try {
      filters = (filters && JSON.parse(filters)) || null
    } catch (error) {
      console.error(console.error(error))
    }

    const AND = []

    if (propsWhere) {
      AND.push(propsWhere)
    }

    if (filters) {
      AND.push(filters)
    }

    const where = {
      AND,
    }

    return super.render(
      <UsersPage
        orderBy="createdAt_ASC"
        filters={filters || {}}
        setFilters={(filters) => this.setFilters(filters)}
        where={where}
        {...other}
      />
    )
  }
}
