import React from 'react'
import PropTypes from 'prop-types'

import PrismaCmsComponent from '@prisma-cms/component'

import { AuthUsersFormProps, AuthUsersFormState } from './interfaces'
import AuthUsersConnector from './AuthUsersConnector'

class AuthUsersForm extends PrismaCmsComponent<
  AuthUsersFormProps,
  AuthUsersFormState
> {
  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    first: PropTypes.number.isRequired,
  }

  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    first: 3,
  }

  getFilters = (): any | null => {
    const { uri } = this.context

    let { authFilters: filters } = uri.query(true)

    if (filters && typeof filters === 'string') {
      try {
        filters = (filters && JSON.parse(filters)) || null
      } catch (error) {
        console.error(console.error(error))
      }
    }

    return filters
  }

  setFilters = (filters: any) => {
    const { uri, router } = this.context

    let newUri = uri.clone()

    const currentFilters = this.getFilters()

    filters = {
      ...currentFilters,
      ...filters,
    }

    try {
      filters = filters ? JSON.stringify(filters) : undefined
    } catch (error) {
      console.error(error)
    }

    if (filters === '{}') {
      filters = undefined
    }

    if (filters) {
      // if (newUri.hasQuery) {
      newUri = newUri.setQuery({
        authFilters: filters,
      })
      // }
      // else {
      //   newUri = newUri.addQuery({
      //     filters,
      //   });
      // }
    } else {
      newUri.removeQuery('authFilters')
    }

    newUri.removeQuery('authPage')

    const url = newUri.resource()

    router.push(url)
  }

  // TODO: надо исправить фильтры
  cleanFilters = () => {
    const { uri, router } = this.context

    // console.error('cleanFilters router', router);

    // const {
    //   history,
    // } = router;

    const newUri = uri.clone()

    newUri.removeQuery('authPage')
    newUri.removeQuery('authFilters')

    const url = newUri.resource()

    router.push(url)
  }

  prepareWhere() {
    return this.getFilters()
  }

  onPasswordChange = (password: string) => {
    this.setState({
      password,
    })
  }

  render() {
    const { uri } = this.context

    const {
      first = AuthUsersForm.defaultProps.first as number,
      ...other
    } = this.props

    const { password } = this.state

    const { authPage } = uri.query(true)

    let skip

    const page =
      authPage && typeof authPage === 'string' ? parseInt(authPage) : 0

    if (page > 1 && first) {
      skip = (page - 1) * first
    }

    return (
      <AuthUsersConnector
        first={first}
        skip={skip}
        where={this.prepareWhere()}
        setFilters={this.setFilters}
        getFilters={this.getFilters}
        cleanFilters={this.cleanFilters}
        password={password || ''}
        onPasswordChange={this.onPasswordChange}
        {...other}
      />
    )
  }
}

// export default (AuthUsersForm as unknown) as React.FC<AuthUsersFormProps>

export default AuthUsersForm
