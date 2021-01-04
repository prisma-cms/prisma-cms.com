import React from 'react'
import { CodeChallengeQuery } from 'src/modules/gql/generated'
import { appRender } from 'src/tests/utils'
import Page from '..'
import { CodeChallengeContext } from '../Context'

jest.mock('@apollo/client/react/hooks', () => {
  return {
    useQuery: (query: any) => {
      // let data: CommentsConnectionQuery | null = null
      let data: any = null

      /**
       * Формируем данные ориентируясь на имя запроса
       */
      switch (query.definitions[0].name.value) {
        case 'codeChallenge':
          {
            const challenge: CodeChallengeContext['challenge'] = {
              __typename: 'CodeChallenge',
              id: 'bd7123c9c441eddfaeb4bdef',
              CreatedBy: {
                __typename: 'User',
                id: 'cjoe87z9f001b0d9683ysg0m4',
                createdAt: new Date('2012-04-09T20:00:00.000Z'),
                updatedAt: new Date('2020-04-16T16:41:16.138Z'),
                username: 'Fi1osof',
                phone: null,
                showEmail: false,
                showPhone: false,
                password: null,
                fullname: '',
                image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                address: null,
                sudo: true,
                active: true,
                activated: true,
                deleted: false,
                hasEmail: true,
                hasPhone: false,
                marketplaceToken: null,
                hidden: null,
              },
              externalKey: 'bd7123c9c441eddfaeb4bdef',
              createdAt: new Date('2019-12-22T14:08:33.364Z'),
              updatedAt: new Date('2019-12-22T14:08:33.364Z'),
              name: 'Comment Your JavaScript Code',
              dashedName: 'comment-your-javascript-code',
              localeTitle: 'Комментарии в коде',
              description:
                '<section id="description">\n<p>Комментарии представляют собой строки кода, которые JavaScript игнорирует. Использование комментариев является отличным способом оставить заметки себе или другим, кому придется разбираться в работе кода. </p>\n<p>  Комментарии в JavaScript бывают двух видов : </p>\n<p>  Два идущих подряд слэша <code>//</code> являются указанием игнорировать весь идущий за ними текст на этой строке: </p>\n<p>  <blockquote> // Это комментарий в строке. </blockquote> </p>\n<p>  Также можно сделать многострочный комментарий: он должен начинаться с <code>/*</code> и заканчиваться на <code>*/</code> : </p>\n<p>  <blockquote> /* Это <br> многострочный комментарий * / </blockquote> </p>\n<p>  <strong>Лучшая практика</strong> <br> В процессе написания кода имеет смысл регулярно добавлять комментарии, в которых будет описываться функциональность различных частей кода. Хороший комментарий может помочь разобраться в сути вашего кода - как другим людям, так <em>и</em> вам в будущем.</p></section>',
              challengeType: 1,
              forumTopicId: 16783,
              translations: null,
              tests: [
                {
                  text:
                    'Create a <code>//</code> style comment that contains at least five letters.',
                  testString: 'assert(code.match(/(\\/\\/)...../g));',
                },
                {
                  text:
                    'Create a <code>/* */</code> style comment that contains at least five letters.',
                  testString:
                    'assert(code.match(/(\\/\\*)([^\\/]{5,})(?=\\*\\/)/gm));',
                },
              ],
              solutions: ['// Fake Comment\n/* Another Comment */\n'],
              instructions:
                '<section id="instructions">\n<p>Попробуйте создать один из комментариев каждого вида.</p></section>',
              files: [
                {
                  key: 'indexjs',
                  ext: 'js',
                  name: 'index',
                  contents: '',
                  head: '',
                  tail: '',
                },
              ],
              videoUrl: 'https://scrimba.com/c/c7ynnTp',
              order: 1,
              superOrder: 2,
              challengeOrder: 0,
              required: [],
              isRequired: false,
              isPrivate: null,
              isBeta: false,
              template: null,
              // time: '10 hours',
              rank: 0,
            }

            const response: CodeChallengeQuery = {
              codeChallenge: challenge,
            }

            data = response
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

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: {
        skip: '0',
        first: '3',
      },
      asPath: '',
    }
  },
}))

describe('CodeChallenge page', () => {
  it('Render CodeChallenge page', async () => {
    const tree = appRender(<Page />)

    // expect(tree.container).toMatchSnapshot();

    expect(tree.container.querySelector('#content')).toMatchSnapshot()
  })
})
