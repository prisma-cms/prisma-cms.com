import React, { useCallback, useMemo, useState } from 'react'
// import PropTypes from 'prop-types'

// import Context, { PrismaCmsContext } from '@prisma-cms/context'

import ViewIcon from 'material-ui-icons/RemoveRedEye'
import BlogLink from 'src/uikit/Link/Blog'
import Autocomplete from 'src/uikit/Autocomplete'
import { BlogAutocompleteProps } from './interfaces'
import {
  BlogsConnectionQueryVariables,
  BlogsConnectionResourceFragment,
  useBlogsConnectionQuery,
  useResourceQuery,
} from 'src/modules/gql/generated'
import { AutocompleteItem } from 'src/uikit/Autocomplete/ReactAutocomplete/interfaces'

const BlogAutocomplete: React.FC<BlogAutocompleteProps> = (props) => {
  // declare context: PrismaCmsContext

  // static contextType = Context

  // static propTypes = {
  //   getFilters: PropTypes.func.isRequired,
  //   setFilters: PropTypes.func.isRequired,
  //   updateObject: PropTypes.func.isRequired,
  // }
  const { where, orderBy } = props

  const [opened, setOpened] = useState(false)

  const onAutocompleteChange = useCallback(
    (_event: React.ChangeEvent<HTMLInputElement>, value: string) => {
      setNameContains((value && value.trim()) || undefined)
    },
    []
  )

  const onDelete = useCallback(() => {
    const { updateObject } = props
    updateObject({
      blogID: undefined,
    })
  }, [props])

  const onMenuVisibilityChange = useCallback((opened) => {
    setOpened(opened)
  }, [])

  // onSelect = (value, item) => {
  //   const { updateObject } = props
  //   const { id } = item
  //   updateObject({
  //     blogID: id || undefined,
  //   })
  // }

  const onSelect = useCallback(
    (_value: string, item: AutocompleteItem | null) => {
      const { updateObject } = props

      const blogID = item?.id

      updateObject({
        blogID: blogID || undefined,
      })
    },
    [props]
  )

  const {
    // data: { objects },
    value,
    // getFilters,
    ...other
  } = props

  // const { name_contains } = (getFilters && getFilters()) || {}

  const [name_contains, setNameContains] = useState<string | undefined>(
    undefined
  )

  const variables = useMemo<BlogsConnectionQueryVariables>(() => {
    return {
      where: {
        ...where,
        name_contains,
      },
      orderBy,
    }
  }, [name_contains, orderBy, where])

  const data = useBlogsConnectionQuery({
    skip: !opened,
    variables,
  })

  const resourceResponse = useResourceQuery({
    skip: !value,
    variables: {
      where: {
        id: value,
      },
    },
  })

  const object = resourceResponse.data?.object

  return useMemo(() => {
    const objects =
      data.data?.objectsConnection.edges.reduce<
        BlogsConnectionResourceFragment[]
      >((current, next) => {
        if (next?.node) {
          current.push(next.node)
        }
        return current
      }, []) || []

    const items =
      (objects &&
        objects.map((n) => {
          return {
            ...n,
            value: n.id,
            label: n.name,
          }
        })) ||
      []

    // const object = value ? items.find((n) => n.id === value) : null
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
        onChange={onAutocompleteChange}
        onDelete={onDelete}
        items={items}
        onMenuVisibilityChange={onMenuVisibilityChange}
        onSelect={onSelect}
        viewElement={
          !opened && object ? (
            <BlogLink object={object} target="_blank">
              <ViewIcon />
            </BlogLink>
          ) : undefined
        }
        {...other}
        value={opened ? name_contains || '' : displayValue || value || ''}
      />
    )
  }, [
    data.data?.objectsConnection.edges,
    name_contains,
    object,
    onAutocompleteChange,
    onDelete,
    onMenuVisibilityChange,
    onSelect,
    opened,
    other,
    value,
  ])
}

export default BlogAutocomplete
