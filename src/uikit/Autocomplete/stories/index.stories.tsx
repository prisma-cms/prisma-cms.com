import React, { useCallback, useState } from 'react'
import { action } from '@storybook/addon-actions'

import { Meta } from '@storybook/react'
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs/blocks'

import Component from '..'
import { AutocompleteProps as ComponentProps } from '../interfaces'
import { AutocompleteItem } from '../ReactAutocomplete/interfaces'

const title = 'prisma-cms.com/UI/Autocomplete'

interface ContainerProps extends ComponentProps {}

export const Editor: React.FC<ContainerProps> = ({
  value: valueProp,
  onChange,
  onSelect: onSelectProp,
  ...other
}) => {
  const [value, setValue] = useState(valueProp)

  const onChangeCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
      onChange && onChange(event, value)
    },
    [onChange]
  )

  const onSelect = useCallback(
    (value: string, item: AutocompleteItem | null) => {
      setValue(value)

      onSelectProp && onSelectProp(value, item)
    },
    [onSelectProp]
  )

  return (
    <div>
      <Component
        {...other}
        onChange={onChangeCallback}
        value={value}
        onSelect={onSelect}
      />
    </div>
  )
}

const args: Partial<ContainerProps> = {
  ...Component.defaultProps,
  onChange: action('onChange'),
  onSelect: action('onSelect'),
  items: [
    {
      value: '1',
      label: 'Item 1',
    },
    {
      value: '2',
      label: 'Item 2',
    },
    {
      value: '3',
      label: 'Item 3',
    },
  ],
}

export default {
  title,
  component: Component,
  argTypes: {},
  args,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>{title}</Title>
          <Subtitle>Content Editor used for Comments and Topics</Subtitle>
          <Description></Description>
          <Primary></Primary>
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as Meta
