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
import { EditorProps as ComponentProps } from '../interfaces'

const title = 'Editor'

interface ContainerProps extends ComponentProps {}

export const Editor: React.FC<ContainerProps> = ({
  readOnly: readOnlyProp,
  value: valueProp,
  onChange,
  ...other
}) => {
  const [readOnly, setReadOnly] = useState(readOnlyProp)

  const setReadOnlyOnClick = useCallback(() => {
    setReadOnly(!readOnly)
  }, [readOnly])

  const [value, setValue] = useState(valueProp)

  const onChangeCallback = useCallback(
    (content, state) => {
      setValue(content)

      onChange && onChange(content, state)
    },
    [onChange]
  )

  return (
    <div>
      <div>
        <button onClick={setReadOnlyOnClick}>
          readOnly {readOnly ? 'Yes' : 'No'}
        </button>
      </div>
      <Component
        {...other}
        onChange={onChangeCallback}
        readOnly={readOnly}
        value={value}
      />
    </div>
  )
}

const args: Partial<ContainerProps> = {
  ...Component.defaultProps,
  readOnly: false,
  onChange: action('onChange'),
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
