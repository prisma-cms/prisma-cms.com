import React from 'react'
import { render } from 'src/tests/utils'
import MainPage from 'pages'
import { CommentsConnectionQuery } from 'src/modules/gql/generated'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: {
        skip: '0',
        first: '2',
      },
      asPath: '',
    }
  },
}))

jest.mock('@apollo/client/react/hooks', () => {
  return {
    useQuery: (query: any) => {
      let data: CommentsConnectionQuery | null = null

      /**
       * Формируем данные ориентируясь на имя запроса
       */
      switch (query.definitions[0].name.value) {
        case 'commentsConnection':
          data = {
            commentsConnection: {
              edges: [
                {
                  node: {
                    id: 'ckfdz5d85q16a0800f34ym0aq',
                    uri: '/comments/ckfdz5d85q16a0800f34ym0aq',
                    createdAt: new Date('2020-09-22T13:08:34.229Z'),
                    updatedAt: new Date('2020-09-22T13:08:34.229Z'),
                    content: {
                      blocks: [
                        {
                          key: '60k6s',
                          text:
                            'Улучшил скрипты. Теперь downtime при деплое проекта составляет всего несколько секунд.',
                          type: 'unstyled',
                          depth: 0,
                          inlineStyleRanges: [],
                          entityRanges: [],
                          data: {},
                        },
                      ],
                      entityMap: {},
                    },
                    CreatedBy: {
                      id: 'cjoe87z9f001b0d9683ysg0m4',
                      username: 'Fi1osof',
                      fullname: 'Николай',
                      image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                      __typename: 'User',
                    },
                    __typename: 'Resource',
                  },
                  __typename: 'ResourceEdge',
                },
                {
                  node: {
                    id: 'ckfdygdfipyd30800jvndzlv2',
                    uri: '/comments/ckfdygdfipyd30800jvndzlv2',
                    createdAt: new Date('2020-09-22T12:49:08.093Z'),
                    updatedAt: new Date('2020-09-22T12:49:08.093Z'),
                    content: {
                      blocks: [
                        {
                          key: '60k6s',
                          text:
                            'Улучшил скрипты. Теперь downtime при деплое проекта составляет всего несколько секунд.',
                          type: 'unstyled',
                          depth: 0,
                          inlineStyleRanges: [],
                          entityRanges: [],
                          data: {},
                        },
                      ],
                      entityMap: {},
                    },
                    CreatedBy: {
                      id: 'ckfdxq6u6pvc80800n4w9lial',
                      username: '1234567',
                      fullname: '234723',
                      image: null,
                      __typename: 'User',
                    },
                    __typename: 'Resource',
                  },
                  __typename: 'ResourceEdge',
                },
                {
                  node: {
                    id: 'ckfdy1mbkpwug0800qwip8p8y',
                    uri: '/comments/ckfdy1mbkpwug0800qwip8p8y',
                    createdAt: new Date('2020-09-22T12:37:39.775Z'),
                    updatedAt: new Date('2020-09-22T12:37:39.775Z'),
                    content: {
                      blocks: [
                        {
                          key: '60k6s',
                          text:
                            'Улучшил скрипты. Теперь downtime при деплое проекта составляет всего несколько секунд.',
                          type: 'unstyled',
                          depth: 0,
                          inlineStyleRanges: [],
                          entityRanges: [],
                          data: {},
                        },
                      ],
                      entityMap: {},
                    },
                    CreatedBy: {
                      id: 'cjoe87z9f001b0d9683ysg0m4',
                      username: 'Fi1osof',
                      fullname: 'Николай',
                      image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                      __typename: 'User',
                    },
                    __typename: 'Resource',
                  },
                  __typename: 'ResourceEdge',
                },
              ],
              aggregate: {
                count: 9282,
                __typename: 'AggregateResource',
              },
              __typename: 'ResourceConnection',
            },
          }

          break
      }

      return {
        loading: false,
        error: null,
        data,
      }
    },
  }
})

describe('MainPage page', () => {
  it('Render MainPage page', async () => {
    const tree = await render(<MainPage />)

    expect(tree.baseElement).toMatchSnapshot()

    expect(tree.container.querySelectorAll('#comments > .comment').length).toBe(
      3
    )
  })
})
