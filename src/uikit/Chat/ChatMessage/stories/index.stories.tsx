import React from 'react'
// import { action } from '@storybook/addon-actions'

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
import { UiChatMessageProps as ComponentProps } from '../interfaces'

const title = 'prisma-cms.com/UI/Chat/ChatMessage'

interface ContainerProps extends ComponentProps {}

export const ChatMessage: React.FC<ContainerProps> = ({
  // readOnly: readOnlyProp,
  // value: valueProp,
  // onChange,
  ...other
}) => {
  // const [readOnly, setReadOnly] = useState(readOnlyProp)

  // const setReadOnlyOnClick = useCallback(() => {
  //   setReadOnly(!readOnly)
  // }, [readOnly])

  // const [value, setValue] = useState(valueProp)

  // const onChangeCallback = useCallback(
  //   (content, state) => {
  //     setValue(content)

  //     onChange && onChange(content, state)
  //   },
  //   [onChange]
  // )

  return (
    <>
      <Component
        {...other}
        // onChange={onChangeCallback}
        // readOnly={readOnly}
        // value={value}
      />
    </>
  )
}

const args: Partial<ContainerProps> = {
  ...Component.defaultProps,
  object: {
    id: 'cjqpjpiab07gq09894z8ad2gv',
    createdAt: new Date('2019-01-09T18:56:55.764Z'),
    updatedAt: new Date('2019-01-09T18:56:55.764Z'),
    content: {
      blocks: [
        {
          key: 'el8bh',
          text:
            'а слушай, такой вопрос, я аот делаю меню через pdomenu (вот ссылка, меню слева - http://aboev.top-dom.by/zhenskoe/3d-futbolki/), но у меня не получается сделать,  чтобы все пункты были свернут, но только пункт, где активный кружок раскрыт был.',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        {
          key: '9i2bh',
          text: ' ',
          type: 'atomic',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [
            {
              offset: 0,
              length: 1,
              key: 0,
            },
          ],
          data: {},
        },
        {
          key: 'edlme',
          text: '',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {
        '0': {
          type: 'TOKEN',
          mutability: 'IMMUTABLE',
          data: {
            content:
              '[[pdoMenu?\n\t        &parents=`0`\n\t        &level=`2`\n\t        &resources=`-1,-17`\n        \t&tplOuter=`@INLINE <ul>[[+wrapper]]</ul>`\n        \t&tpl=`@INLINE <li class="level2"><a href="[[+link]]"><span>&nbsp;&nbsp;&nbsp;- [[+menutitle]]</span></a>[[+wrapper]]</li>`\n        \t&tplHere=`@INLINE <li class="level2 active open"><a class="active" href="[[+link]]"><span>&nbsp;&nbsp;&nbsp;- [[+menutitle]]</span></a>[[+wrapper]]</li>`\n        \t&tplParentRow=`@INLINE <li class="level1 headcat open"><a href="[[+link]]">[[+menutitle]]</a><ul>[[+wrapper]]</ul></li>`\n        \t&tplInner=`@INLINE [[+wrapper]]`\n        \t&tplParentRowHere=`@INLINE <li class="level2 active open"><a class="active" href="[[+link]]"><span>&nbsp;&nbsp;&nbsp;- [[+menutitle]]</span></a><ul>[[+wrapper]]</ul></li>`\n        ]]',
            lang: 'html',
          },
        },
      },
    },
    contentText:
      'а слушай, такой вопрос, я аот делаю меню через pdomenu (вот ссылка, меню слева - http://aboev.top-dom.by/zhenskoe/3d-futbolki/), но у меня не получается сделать,  чтобы все пункты были свернут, но только пункт, где активный кружок раскрыт был.',
    __typename: 'ChatMessage',
    Room: {
      id: 'cjqm9bu634uvn0989ghla52cz',
      createdAt: new Date('2019-01-07T11:43:03.292Z'),
      updatedAt: new Date('2019-01-07T11:43:41.618Z'),
      name: 'Общие сообщения мне',
      description: null,
      image: null,
      code: 'Fi1osof',
      isPublic: true,
      __typename: 'ChatRoom',
    },
    CreatedBy: {
      id: 'cjoe898pd08af0d96wnaxc9hk',
      createdAt: new Date('2018-11-10T19:48:03.000Z'),
      updatedAt: new Date('2019-06-30T19:45:04.349Z'),
      username: 'dima_rabecki',
      email: null,
      phone: null,
      showEmail: false,
      showPhone: false,
      password: null,
      fullname: 'Дмитрий',
      image: '',
      address: null,
      sudo: false,
      active: true,
      activated: true,
      deleted: false,
      hasEmail: true,
      hasPhone: false,
      marketplaceToken: null,
      hidden: null,
      __typename: 'User',
    },
  },
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
