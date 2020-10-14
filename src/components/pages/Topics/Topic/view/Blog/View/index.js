import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Context from '@prisma-cms/context'

import ViewIcon from 'material-ui-icons/RemoveRedEye'

export default class TopicBlogView extends Component {
  static contextType = Context

  static propTypes = {
    getFilters: PropTypes.func.isRequired,
    setFilters: PropTypes.func.isRequired,
    updateObject: PropTypes.func.isRequired,
  }

  state = {
    opened: false,
  }

  render() {
    const { BlogLink, Autocomplete } = this.context

    const {
      data: { objects },
      value,
      getFilters,
      setFilters,
      updateObject,
      ...other
    } = this.props

    const { opened } = this.state

    const { name_contains } = getFilters() || {}

    const items =
      (objects &&
        objects.map((n) => {
          return {
            ...n,
            label: n.name,
          }
        })) ||
      []

    const object = value ? items.find((n) => n.id === value) : null

    /**
     * Если есть id компании и нет введенного значения,
     * то выводим название компании
     */
    const displayValue =
      (opened && name_contains) || (object && object.name) || value

    return (
      <Autocomplete
        inputProps={{
          label: 'Блог',
          helperText: 'Укажите в какой блог публикуете',
        }}
        onChange={(event, value) => {
          // onChange && onChange(event, value);
          setFilters({
            name_contains: (value && value.trim()) || undefined,
          })
        }}
        onDelete={() => {
          updateObject({
            blogID: undefined,
          })
        }}
        items={items}
        value={opened ? name_contains || '' : displayValue || value || ''}
        onMenuVisibilityChange={(opened) => {
          this.setState({
            opened,
          })
        }}
        onSelect={(value, item) => {
          const { id } = item
          updateObject({
            blogID: id || undefined,
          })
        }}
        viewElement={
          !opened && object ? (
            <BlogLink object={object} target="_blank">
              <ViewIcon />
            </BlogLink>
          ) : undefined
        }
        {...other}
      />
    )
  }
}
