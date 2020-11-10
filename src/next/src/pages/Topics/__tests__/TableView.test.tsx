// TODO: Сейчас пагинатор требует контекст роутера. Надо пофиксить.

import React from 'react'
import { appRender } from 'src/tests/utils'

import TopicsPage from '..'

import { TopicsConnectionQuery } from 'src/modules/gql/generated'

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
      // ... some logic to decide which query has been requested.

      // console.log('mock useQuery query', JSON.stringify(query, undefined, 2));
      // console.log('mock useQuery options', options);

      let data: TopicsConnectionQuery | null = null

      // console.log('query.definitions[0].name.value', query.definitions[0].name.value);

      /**
       * Формируем данные ориентируясь на имя запроса
       */
      switch (query.definitions[0].name.value) {
        case 'topicsConnection':
          data = {
            objectsConnection: {
              aggregate: {
                count: 10951,
                __typename: 'AggregateResource',
              },
              edges: [
                {
                  node: {
                    id: 'cjoe89b6c08jy0d96nddrvtk9',
                    updatedAt: '2020-09-22T13:08:34.245Z',
                    name: 'modCaptcha',
                    uri: '/blog/vehicles/315.html',
                    longtitle: null,
                    __typename: 'Resource',
                    CreatedBy: {
                      id: 'cjoe87z9f001b0d9683ysg0m4',
                      username: 'Fi1osof',
                      fullname: 'Николай',
                      image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                      __typename: 'User',
                    },
                    Comments: [
                      {
                        id: 'cjq8zei4e0nql0989cpbkfz91',
                        updatedAt: '2014-01-26T18:52:35.000Z',
                        CreatedBy: {
                          id: 'cjoe87zw6003b0d96mjkk7w9j',
                          username: 'vgrish',
                          fullname: '',
                          image: '00/00/47/2013/03/22/avatar_100x100.jpg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zei5z0nqw0989b7f5mrcm',
                        updatedAt: '2014-01-26T19:02:55.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zei7n0nrd0989zjt3hzmk',
                        updatedAt: '2014-01-26T19:25:11.000Z',
                        CreatedBy: {
                          id: 'cjoe87zw6003b0d96mjkk7w9j',
                          username: 'vgrish',
                          fullname: '',
                          image: '00/00/47/2013/03/22/avatar_100x100.jpg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zeiat0nrq0989ua925vjs',
                        updatedAt: '2014-01-26T19:41:45.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zekbh0o8s0989ky09hz6d',
                        updatedAt: '2014-02-05T00:00:21.000Z',
                        CreatedBy: {
                          id: 'cjoe8806f003t0d96hklbdmu9',
                          username: 'gsnx',
                          fullname: 'Сергей',
                          image: 'uploads/7hERl0FWE-hacker2.png',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zekeg0o9i0989w34o5l3n',
                        updatedAt: '2014-02-05T00:17:26.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zeoyg0pb4098904ro8pey',
                        updatedAt: '2014-03-12T00:00:12.000Z',
                        CreatedBy: {
                          id: 'cjoe887g8015t0d965awz8m10',
                          username: 'Tramp1357',
                          fullname: 'Александр Марков',
                          image: '00/01/46/2013/07/19/avatar_100x100.jpg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zeozz0pbe09893v482cfr',
                        updatedAt: '2014-03-12T08:09:06.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zep240pbv0989yy5shbbb',
                        updatedAt: '2014-03-12T10:18:32.000Z',
                        CreatedBy: {
                          id: 'cjoe887g8015t0d965awz8m10',
                          username: 'Tramp1357',
                          fullname: 'Александр Марков',
                          image: '00/01/46/2013/07/19/avatar_100x100.jpg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zep3n0pc80989s3xc10fj',
                        updatedAt: '2014-03-12T11:02:22.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zep560pcn0989b1w1oxah',
                        updatedAt: '2014-03-12T13:17:26.000Z',
                        CreatedBy: {
                          id: 'cjoe887g8015t0d965awz8m10',
                          username: 'Tramp1357',
                          fullname: 'Александр Марков',
                          image: '00/01/46/2013/07/19/avatar_100x100.jpg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zep770pd10989gapxyh2a',
                        updatedAt: '2014-03-12T16:15:03.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zgs1316hz0989yjfst6z4',
                        updatedAt: '2014-12-17T18:34:55.000Z',
                        CreatedBy: {
                          id: 'cjoe887jy016h0d96ff22fpbw',
                          username: 'php-include',
                          fullname: 'Алфёров Юрий',
                          image: '',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zgs4216io0989kgcqghun',
                        updatedAt: '2014-12-17T19:33:00.000Z',
                        CreatedBy: {
                          id: 'cjoe887jy016h0d96ff22fpbw',
                          username: 'php-include',
                          fullname: 'Алфёров Юрий',
                          image: '',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zgsao16jx0989oumyeivs',
                        updatedAt: '2014-12-17T19:55:48.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zipog1lly0989ct9tds3k',
                        updatedAt: '2015-04-22T17:34:57.000Z',
                        CreatedBy: {
                          id: 'cjoe88cyn02150d96orqz4rpx',
                          username: 'Ilya Igonkin',
                          fullname: 'Ilya Igonkin',
                          image: '',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zizjo1nol09893t5mrz93',
                        updatedAt: '2015-06-01T14:52:21.000Z',
                        CreatedBy: {
                          id: 'cjoe88cxx02120d96h0pmeqox',
                          username: 'Kyrt_God',
                          fullname: 'ВДВ',
                          image: '',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8ziznw1npo0989osv233ib',
                        updatedAt: '2015-06-01T18:07:56.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zizqb1nq50989s9dx8k56',
                        updatedAt: '2015-06-01T18:10:35.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zizux1nr8098970hfkshm',
                        updatedAt: '2015-06-02T09:16:54.000Z',
                        CreatedBy: {
                          id: 'cjoe88cxx02120d96h0pmeqox',
                          username: 'Kyrt_God',
                          fullname: 'ВДВ',
                          image: '',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zizvt1nrh0989ui8cnabh',
                        updatedAt: '2015-06-02T10:44:15.000Z',
                        CreatedBy: {
                          id: 'cjoe88cxx02120d96h0pmeqox',
                          username: 'Kyrt_God',
                          fullname: 'ВДВ',
                          image: '',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zizwp1nro09894a3wlhdf',
                        updatedAt: '2015-06-02T12:23:34.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zizxs1nrz0989mjdlck2p',
                        updatedAt: '2015-06-02T12:45:07.000Z',
                        CreatedBy: {
                          id: 'cjoe88cxx02120d96h0pmeqox',
                          username: 'Kyrt_God',
                          fullname: 'ВДВ',
                          image: '',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj0021nsg098994cyg0qs',
                        updatedAt: '2015-06-02T12:48:10.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj01o1nsw0989d1f8x385',
                        updatedAt: '2015-06-02T13:47:57.000Z',
                        CreatedBy: {
                          id: 'cjoe88cxx02120d96h0pmeqox',
                          username: 'Kyrt_God',
                          fullname: 'ВДВ',
                          image: '',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj0371nt70989l68skp6c',
                        updatedAt: '2015-06-02T13:51:42.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj05p1ntk09895uuhs4mp',
                        updatedAt: '2015-06-02T14:09:28.000Z',
                        CreatedBy: {
                          id: 'cjoe88cxx02120d96h0pmeqox',
                          username: 'Kyrt_God',
                          fullname: 'ВДВ',
                          image: '',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj0791nu10989chzb2pq7',
                        updatedAt: '2015-06-02T14:23:49.000Z',
                        CreatedBy: {
                          id: 'cjoe88cxx02120d96h0pmeqox',
                          username: 'Kyrt_God',
                          fullname: 'ВДВ',
                          image: '',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj08l1nud0989kn22cnhn',
                        updatedAt: '2015-06-02T14:32:44.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj09o1nui0989gjfj24ye',
                        updatedAt: '2015-06-02T14:37:33.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj0bu1nuz098930562zd3',
                        updatedAt: '2015-06-02T15:12:25.000Z',
                        CreatedBy: {
                          id: 'cjoe88cxx02120d96h0pmeqox',
                          username: 'Kyrt_God',
                          fullname: 'ВДВ',
                          image: '',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj0ec1nvc0989kh5ur277',
                        updatedAt: '2015-06-02T15:19:51.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj0ge1nvw09898zrv1mew',
                        updatedAt: '2015-06-02T15:29:50.000Z',
                        CreatedBy: {
                          id: 'cjoe88cxx02120d96h0pmeqox',
                          username: 'Kyrt_God',
                          fullname: 'ВДВ',
                          image: '',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj0hu1nw30989dhdmftcf',
                        updatedAt: '2015-06-02T15:42:24.000Z',
                        CreatedBy: {
                          id: 'cjoe88cxx02120d96h0pmeqox',
                          username: 'Kyrt_God',
                          fullname: 'ВДВ',
                          image: '',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj0ji1nwk0989z93x10yw',
                        updatedAt: '2015-06-02T15:47:32.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj0ki1nww09894dek0iw8',
                        updatedAt: '2015-06-02T15:59:03.000Z',
                        CreatedBy: {
                          id: 'cjoe88cxx02120d96h0pmeqox',
                          username: 'Kyrt_God',
                          fullname: 'ВДВ',
                          image: '',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj0lz1nx80989oukkv967',
                        updatedAt: '2015-06-02T16:22:52.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'ckfdxq8wopveo080030h6dqen',
                        updatedAt: '2020-09-22T12:28:59.895Z',
                        CreatedBy: {
                          id: 'ckfdxq6u6pvc80800n4w9lial',
                          username: '1234567',
                          fullname: '234723',
                          image: null,
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'ckfdy1mbkpwug0800qwip8p8y',
                        updatedAt: '2020-09-22T12:37:39.775Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'ckfdygdfipyd30800jvndzlv2',
                        updatedAt: '2020-09-22T12:49:08.093Z',
                        CreatedBy: {
                          id: 'ckfdxq6u6pvc80800n4w9lial',
                          username: '1234567',
                          fullname: '234723',
                          image: null,
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'ckfdz5d85q16a0800f34ym0aq',
                        updatedAt: '2020-09-22T13:08:34.229Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                    ],
                    Blog: {
                      id: 'cjoe898tw08b50d96sn5j3ec2',
                      name: 'Сборки и пакеты',
                      longtitle: null,
                      uri: '/blog/vehicles/',
                      __typename: 'Resource',
                    },
                    Tags: [
                      {
                        Tag: {
                          id: 'cjoe8dj2p18m50d96e2w9egrg',
                          name: 'captcha',
                          __typename: 'Tag',
                        },
                        __typename: 'ResourceTag',
                      },
                      {
                        Tag: {
                          id: 'cjoe8djwp19ae0d96oonj5row',
                          name: 'extras',
                          __typename: 'Tag',
                        },
                        __typename: 'ResourceTag',
                      },
                      {
                        Tag: {
                          id: 'cjoe8dlkv1aq30d96si7bfpgw',
                          name: 'modCaptcha',
                          __typename: 'Tag',
                        },
                        __typename: 'ResourceTag',
                      },
                      {
                        Tag: {
                          id: 'cjoe8dlvp1azf0d96iwbhkg1m',
                          name: 'modx',
                          __typename: 'Tag',
                        },
                        __typename: 'ResourceTag',
                      },
                      {
                        Tag: {
                          id: 'cjoe8dmgw1c0w0d96oqq5gd5x',
                          name: 'modx revolution',
                          __typename: 'Tag',
                        },
                        __typename: 'ResourceTag',
                      },
                      {
                        Tag: {
                          id: 'cjoe8dteb1j8p0d96ufykkjmm',
                          name: 'пакеты',
                          __typename: 'Tag',
                        },
                        __typename: 'ResourceTag',
                      },
                    ],
                  },
                  __typename: 'ResourceEdge',
                },
                {
                  node: {
                    id: 'ckfdz5d85q16a0800f34ym0aq',
                    updatedAt: '2020-09-22T13:08:34.229Z',
                    name: 'Я уже сейчас так наверняка не скажу, но скорее все',
                    uri:
                      '/comments/blog/vehicles/315.html/ya-uzhe-seychas-tak-navernyaka-ne-skazhu,-no-skoree-vse',
                    longtitle: null,
                    __typename: 'Resource',
                    CreatedBy: {
                      id: 'cjoe87z9f001b0d9683ysg0m4',
                      username: 'Fi1osof',
                      fullname: 'Николай',
                      image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                      __typename: 'User',
                    },
                    Comments: [],
                    Blog: null,
                    Tags: [],
                  },
                  __typename: 'ResourceEdge',
                },
                {
                  node: {
                    id: 'ckfdygdfipyd30800jvndzlv2',
                    updatedAt: '2020-09-22T12:49:08.093Z',
                    name: 'Ну вот всё поставил как в статье. Картbнка каптчи',
                    uri:
                      '/comments/blog/vehicles/315.html/nu-vot-vse-postavil-kak-v-state.-kartbnka-kaptchi',
                    longtitle: null,
                    __typename: 'Resource',
                    CreatedBy: {
                      id: 'ckfdxq6u6pvc80800n4w9lial',
                      username: '1234567',
                      fullname: '234723',
                      image: null,
                      __typename: 'User',
                    },
                    Comments: [],
                    Blog: null,
                    Tags: [],
                  },
                  __typename: 'ResourceEdge',
                },
                {
                  node: {
                    id: 'ckfdy1mbkpwug0800qwip8p8y',
                    updatedAt: '2020-09-22T12:37:39.775Z',
                    name: 'В статье, вроде, информации достаточно в статье. П',
                    uri:
                      '/comments/blog/vehicles/315.html/v-state,-vrode,-informatsii-dostatochno-v-state.-p',
                    longtitle: null,
                    __typename: 'Resource',
                    CreatedBy: {
                      id: 'cjoe87z9f001b0d9683ysg0m4',
                      username: 'Fi1osof',
                      fullname: 'Николай',
                      image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                      __typename: 'User',
                    },
                    Comments: [],
                    Blog: null,
                    Tags: [],
                  },
                  __typename: 'ResourceEdge',
                },
                {
                  node: {
                    id: 'ckfdxq8wopveo080030h6dqen',
                    updatedAt: '2020-09-22T12:28:59.895Z',
                    name: 'А ге инструкция как её пользовать?',
                    uri:
                      '/comments/blog/vehicles/315.html/a-ge-instruktsiya-kak-ee-polzovat',
                    longtitle: null,
                    __typename: 'Resource',
                    CreatedBy: {
                      id: 'ckfdxq6u6pvc80800n4w9lial',
                      username: '1234567',
                      fullname: '234723',
                      image: null,
                      __typename: 'User',
                    },
                    Comments: [],
                    Blog: null,
                    Tags: [],
                  },
                  __typename: 'ResourceEdge',
                },
                {
                  node: {
                    id: 'ckan9byhmc16y08000qt76jda',
                    updatedAt: '2020-05-26T01:45:01.783Z',
                    name: 'WebGL',
                    uri: '/projects/webgl/',
                    longtitle: null,
                    __typename: 'Resource',
                    CreatedBy: {
                      id: 'cjoe87z9f001b0d9683ysg0m4',
                      username: 'Fi1osof',
                      fullname: 'Николай',
                      image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                      __typename: 'User',
                    },
                    Comments: [],
                    Blog: null,
                    Tags: [],
                  },
                  __typename: 'ResourceEdge',
                },
                {
                  node: {
                    id: 'cjoe8a0cr0c840d96szf0f3hz',
                    updatedAt: '2020-05-21T20:58:41.080Z',
                    name:
                      'Гонки на скорость, часть вторая. Ускорение Modx Revo более чем в 8 раз',
                    uri:
                      '/topics/gonki-na-skorost-chast-vtoraya.-uskorenie-modx-revo-bolee-chem-v-8-raz.html',
                    longtitle: null,
                    __typename: 'Resource',
                    CreatedBy: {
                      id: 'cjoe8824k00c20d963f7b198d',
                      username: 'den99',
                      fullname: 'doggy00@inbox.ru',
                      image: '00/01/66/2013/07/13/avatar_100x100.jpg',
                      __typename: 'User',
                    },
                    Comments: [
                      {
                        id: 'cjq8zciow09ue09895j2qbxy0',
                        updatedAt: '2013-08-06T08:52:40.000Z',
                        CreatedBy: {
                          id: 'cjoe8824k00c20d963f7b198d',
                          username: 'den99',
                          fullname: 'doggy00@inbox.ru',
                          image: '00/01/66/2013/07/13/avatar_100x100.jpg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zciqs09uu0989bo6c11sp',
                        updatedAt: '2013-08-06T21:49:38.000Z',
                        CreatedBy: {
                          id: 'cjoe887g8015t0d965awz8m10',
                          username: 'Tramp1357',
                          fullname: 'Александр Марков',
                          image: '00/01/46/2013/07/19/avatar_100x100.jpg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zcis009v509895hzujxud',
                        updatedAt: '2013-08-06T23:13:33.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zcitr09ve09892c7ctqae',
                        updatedAt: '2013-08-06T23:15:06.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zcivg09vy0989ln3vcdoq',
                        updatedAt: '2013-08-06T23:18:54.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zcix309wa098954mustmp',
                        updatedAt: '2013-08-06T23:25:27.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zciyu09wq0989uwpvyo4t',
                        updatedAt: '2013-08-06T23:53:27.000Z',
                        CreatedBy: {
                          id: 'cjoe8824k00c20d963f7b198d',
                          username: 'den99',
                          fullname: 'doggy00@inbox.ru',
                          image: '00/01/66/2013/07/13/avatar_100x100.jpg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj18v1o2d09897q0f46hq',
                        updatedAt: '2015-06-04T10:00:41.000Z',
                        CreatedBy: {
                          id: 'cjoe88dt5026e0d96bhhrhcpg',
                          username: 'elezeo',
                          fullname: 'Максим Хромов',
                          image: '',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj1cl1o3a09899yhpye8z',
                        updatedAt: '2015-06-04T17:46:27.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj1yb1o830989a9hr02w0',
                        updatedAt: '2015-06-07T09:28:07.000Z',
                        CreatedBy: {
                          id: 'cjoe88dt5026e0d96bhhrhcpg',
                          username: 'elezeo',
                          fullname: 'Максим Хромов',
                          image: '',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj20k1o8p0989vts0i5fq',
                        updatedAt: '2015-06-07T10:19:03.000Z',
                        CreatedBy: {
                          id: 'cjoe88dt5026e0d96bhhrhcpg',
                          username: 'elezeo',
                          fullname: 'Максим Хромов',
                          image: '',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj2mx1ody0989ph1kjzep',
                        updatedAt: '2015-06-08T19:55:54.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj4fl1osm0989ut1lqw3q',
                        updatedAt: '2015-06-12T22:12:49.000Z',
                        CreatedBy: {
                          id: 'cjoe88ejl02b80d96ecfqe9ni',
                          username: 'almaks',
                          fullname: 'Алексей ',
                          image: '',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj4gw1osx0989cpwszo3y',
                        updatedAt: '2015-06-13T00:03:17.000Z',
                        CreatedBy: {
                          id: 'cjoe887g8015t0d965awz8m10',
                          username: 'Tramp1357',
                          fullname: 'Александр Марков',
                          image: '00/01/46/2013/07/19/avatar_100x100.jpg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj4hr1ot60989wap89c72',
                        updatedAt: '2015-06-13T07:29:06.000Z',
                        CreatedBy: {
                          id: 'cjoe88ejl02b80d96ecfqe9ni',
                          username: 'almaks',
                          fullname: 'Алексей ',
                          image: '',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj4j11otl0989rwsy7ey8',
                        updatedAt: '2015-06-13T09:44:16.000Z',
                        CreatedBy: {
                          id: 'cjoe887g8015t0d965awz8m10',
                          username: 'Tramp1357',
                          fullname: 'Александр Марков',
                          image: '00/01/46/2013/07/19/avatar_100x100.jpg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj4lr1otu09897jelh2ok',
                        updatedAt: '2015-06-13T09:50:13.000Z',
                        CreatedBy: {
                          id: 'cjoe88ejl02b80d96ecfqe9ni',
                          username: 'almaks',
                          fullname: 'Алексей ',
                          image: '',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj4nn1oui09898l8ti171',
                        updatedAt: '2015-06-13T10:20:20.000Z',
                        CreatedBy: {
                          id: 'cjoe887g8015t0d965awz8m10',
                          username: 'Tramp1357',
                          fullname: 'Александр Марков',
                          image: '00/01/46/2013/07/19/avatar_100x100.jpg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj4pa1ouq0989ow22oxf0',
                        updatedAt: '2015-06-13T10:29:11.000Z',
                        CreatedBy: {
                          id: 'cjoe88ejl02b80d96ecfqe9ni',
                          username: 'almaks',
                          fullname: 'Алексей ',
                          image: '',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj63v1p6a0989lqhqt92t',
                        updatedAt: '2015-06-16T18:40:25.000Z',
                        CreatedBy: {
                          id: 'cjoe88ejl02b80d96ecfqe9ni',
                          username: 'almaks',
                          fullname: 'Алексей ',
                          image: '',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj65a1p6o0989i4iwja08',
                        updatedAt: '2015-06-16T18:52:53.000Z',
                        CreatedBy: {
                          id: 'cjoe88ejl02b80d96ecfqe9ni',
                          username: 'almaks',
                          fullname: 'Алексей ',
                          image: '',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj6br1p7w0989i2pkk0hl',
                        updatedAt: '2015-06-16T19:00:07.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj6cl1p840989rbhfgfyf',
                        updatedAt: '2015-06-16T19:00:38.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj6db1p8d0989rqu32d8m',
                        updatedAt: '2015-06-16T19:05:34.000Z',
                        CreatedBy: {
                          id: 'cjoe88ejl02b80d96ecfqe9ni',
                          username: 'almaks',
                          fullname: 'Алексей ',
                          image: '',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj6en1p8n0989y6f8br58',
                        updatedAt: '2015-06-16T19:11:45.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj6ge1p940989xq56tkut',
                        updatedAt: '2015-06-16T19:32:46.000Z',
                        CreatedBy: {
                          id: 'cjoe88ejl02b80d96ecfqe9ni',
                          username: 'almaks',
                          fullname: 'Алексей ',
                          image: '',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zj6ho1p9g09898bfjkyrq',
                        updatedAt: '2015-06-16T20:02:01.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zlvgu29ac0989dhqpmcvd',
                        updatedAt: '2016-03-21T14:41:28.000Z',
                        CreatedBy: {
                          id: 'cjoe88n5q03wq0d96al8qs9lb',
                          username: 'Hakujin',
                          fullname: 'Алексей Хворостов',
                          image: '',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zn01w2icn0989w4ro499c',
                        updatedAt: '2017-11-30T22:13:12.000Z',
                        CreatedBy: {
                          id: 'cjoe87zdi001q0d96m6m2hj2d',
                          username: 'Geforester',
                          fullname: 'Роман',
                          image: '00/00/14/2013/03/21/avatar_100x100.jpg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zn02m2ics0989qh88c6m6',
                        updatedAt: '2017-11-30T22:24:16.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zn03f2id109894e0drgen',
                        updatedAt: '2017-11-30T22:29:58.000Z',
                        CreatedBy: {
                          id: 'cjoe87zdi001q0d96m6m2hj2d',
                          username: 'Geforester',
                          fullname: 'Роман',
                          image: '00/00/14/2013/03/21/avatar_100x100.jpg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zn04p2idb0989erz7bitn',
                        updatedAt: '2017-11-30T22:33:53.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zn06b2idu09894k1p9jtj',
                        updatedAt: '2017-11-30T22:40:06.000Z',
                        CreatedBy: {
                          id: 'cjoe87zdi001q0d96m6m2hj2d',
                          username: 'Geforester',
                          fullname: 'Роман',
                          image: '00/00/14/2013/03/21/avatar_100x100.jpg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zn0762ie6098930d8ggcv',
                        updatedAt: '2017-11-30T22:49:13.000Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjq8zn07r2iec0989042615je',
                        updatedAt: '2017-11-30T22:52:29.000Z',
                        CreatedBy: {
                          id: 'cjoe87zdi001q0d96m6m2hj2d',
                          username: 'Geforester',
                          fullname: 'Роман',
                          image: '00/00/14/2013/03/21/avatar_100x100.jpg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjs0fz1b1e4av09898x6uvjea',
                        updatedAt: '2019-02-11T14:38:15.455Z',
                        CreatedBy: {
                          id: 'cjs0fyp6be4850989xfjjcqjw',
                          username: 'DC Studio',
                          fullname: null,
                          image: null,
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjs16cw6hebiy0989q0y60z96',
                        updatedAt: '2019-02-12T02:56:08.682Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'cjs99m0qygido0989ufzbm8zj',
                        updatedAt: '2019-02-17T18:50:59.252Z',
                        CreatedBy: {
                          id: 'cjoe889n601hz0d96g7n43xb5',
                          username: 'Eo_Narique',
                          fullname: 'Олег Анатольевич',
                          image: '00/Eo_Narique/k3AXpZNIWGk.jpg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'ckagrmzqx1yq80800h377q1un',
                        updatedAt: '2020-05-21T12:59:39.668Z',
                        CreatedBy: {
                          id: 'ckaduyy15vhmr0700mix7un05',
                          username: 'EMAKASS',
                          fullname: 'EMAKASS',
                          image:
                            'uploads/hA2ryimKy-b69b83e9b6044a71cacb1266ca42d5a6.png',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'ckagsfocr204x0800mrpag1j7',
                        updatedAt: '2020-05-21T13:05:24.746Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'ckagtee5922be0800srbb5s2z',
                        updatedAt: '2020-05-21T13:32:24.476Z',
                        CreatedBy: {
                          id: 'ckaduyy15vhmr0700mix7un05',
                          username: 'EMAKASS',
                          fullname: 'EMAKASS',
                          image:
                            'uploads/hA2ryimKy-b69b83e9b6044a71cacb1266ca42d5a6.png',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'ckaguje55248r080063orbko0',
                        updatedAt: '2020-05-21T14:04:17.360Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'ckagv2e6o258i08003jhuzaxu',
                        updatedAt: '2020-05-21T14:19:03.887Z',
                        CreatedBy: {
                          id: 'ckaduyy15vhmr0700mix7un05',
                          username: 'EMAKASS',
                          fullname: 'EMAKASS',
                          image:
                            'uploads/hA2ryimKy-b69b83e9b6044a71cacb1266ca42d5a6.png',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                      {
                        id: 'ckah9cb3631dk0800444o98nb',
                        updatedAt: '2020-05-21T20:58:41.057Z',
                        CreatedBy: {
                          id: 'cjoe87z9f001b0d9683ysg0m4',
                          username: 'Fi1osof',
                          fullname: 'Николай',
                          image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                          __typename: 'User',
                        },
                        __typename: 'Resource',
                      },
                    ],
                    Blog: {
                      id: 'cjoe8991i08cl0d960elosj6n',
                      name: 'Эксперименты и исследования',
                      longtitle: null,
                      uri: '/blog/research/',
                      __typename: 'Resource',
                    },
                    Tags: [
                      {
                        Tag: {
                          id: 'cjoe8dj0218kp0d96nbsvcawx',
                          name: 'CacheAccelerator',
                          __typename: 'Tag',
                        },
                        __typename: 'ResourceTag',
                      },
                      {
                        Tag: {
                          id: 'cjoe8dlvp1azf0d96iwbhkg1m',
                          name: 'modx',
                          __typename: 'Tag',
                        },
                        __typename: 'ResourceTag',
                      },
                      {
                        Tag: {
                          id: 'cjoe8dmgw1c0w0d96oqq5gd5x',
                          name: 'modx revolution',
                          __typename: 'Tag',
                        },
                        __typename: 'ResourceTag',
                      },
                      {
                        Tag: {
                          id: 'cjoe8dmw51csg0d96fkny32mg',
                          name: 'modx-клуб',
                          __typename: 'Tag',
                        },
                        __typename: 'ResourceTag',
                      },
                      {
                        Tag: {
                          id: 'cjoe8dn181d0s0d9629i6ltly',
                          name: 'MODX-парсер',
                          __typename: 'Tag',
                        },
                        __typename: 'ResourceTag',
                      },
                      {
                        Tag: {
                          id: 'cjoe8dnak1dd40d96c8kaxko8',
                          name: 'modxSmarty',
                          __typename: 'Tag',
                        },
                        __typename: 'ResourceTag',
                      },
                      {
                        Tag: {
                          id: 'cjoe8dnuv1dyw0d964ogkneyu',
                          name: 'phpTemplates',
                          __typename: 'Tag',
                        },
                        __typename: 'ResourceTag',
                      },
                      {
                        Tag: {
                          id: 'cjoe8dnx21e1k0d96fkrawedf',
                          name: 'phpthumbof',
                          __typename: 'Tag',
                        },
                        __typename: 'ResourceTag',
                      },
                      {
                        Tag: {
                          id: 'cjoe8dnxp1e2o0d96a8t2mcxt',
                          name: 'phpThumbsup',
                          __typename: 'Tag',
                        },
                        __typename: 'ResourceTag',
                      },
                      {
                        Tag: {
                          id: 'cjoe8do771ebc0d965grxwdp7',
                          name: 'RezImgCrop',
                          __typename: 'Tag',
                        },
                        __typename: 'ResourceTag',
                      },
                      {
                        Tag: {
                          id: 'cjoe8dova1f7p0d968dk7112n',
                          name: 'smarty',
                          __typename: 'Tag',
                        },
                        __typename: 'ResourceTag',
                      },
                      {
                        Tag: {
                          id: 'cjoe8dpld1fxp0d96xtvfmic4',
                          name: 'xFPC',
                          __typename: 'Tag',
                        },
                        __typename: 'ResourceTag',
                      },
                      {
                        Tag: {
                          id: 'cjoe8dt4s1j090d96qq9vz1vc',
                          name: 'оптимизация',
                          __typename: 'Tag',
                        },
                        __typename: 'ResourceTag',
                      },
                      {
                        Tag: {
                          id: 'cjoe8dtfk1jal0d96c8phzozq',
                          name: 'парсер',
                          __typename: 'Tag',
                        },
                        __typename: 'ResourceTag',
                      },
                      {
                        Tag: {
                          id: 'cjoe8dvbd1kum0d96fjnmx0vy',
                          name: 'тормозит сайт',
                          __typename: 'Tag',
                        },
                        __typename: 'ResourceTag',
                      },
                    ],
                  },
                  __typename: 'ResourceEdge',
                },
                {
                  node: {
                    id: 'ckah9cb3631dk0800444o98nb',
                    updatedAt: '2020-05-21T20:58:41.057Z',
                    name: 'Вот попробуйте прописать другой шаблон. А лучше, е',
                    uri:
                      '/comments/topics/gonki-na-skorost-chast-vtoraya.-uskorenie-modx-revo-bolee-chem-v-8-raz.html/vot-poprobuyte-propisat-drugoy-shablon.-a-luchshe,-e',
                    longtitle: null,
                    __typename: 'Resource',
                    CreatedBy: {
                      id: 'cjoe87z9f001b0d9683ysg0m4',
                      username: 'Fi1osof',
                      fullname: 'Николай',
                      image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                      __typename: 'User',
                    },
                    Comments: [],
                    Blog: null,
                    Tags: [],
                  },
                  __typename: 'ResourceEdge',
                },
                {
                  node: {
                    id: 'ckagv2e6o258i08003jhuzaxu',
                    updatedAt: '2020-05-21T14:19:03.887Z',
                    name: 'Имеется другой шаблон tpl в логах ничего нет, что',
                    uri:
                      '/comments/topics/gonki-na-skorost-chast-vtoraya.-uskorenie-modx-revo-bolee-chem-v-8-raz.html/imeetsya-drugoy-shablon-tpl-v-logakh-nichego-net,-chto',
                    longtitle: null,
                    __typename: 'Resource',
                    CreatedBy: {
                      id: 'ckaduyy15vhmr0700mix7un05',
                      username: 'EMAKASS',
                      fullname: 'EMAKASS',
                      image:
                        'uploads/hA2ryimKy-b69b83e9b6044a71cacb1266ca42d5a6.png',
                      __typename: 'User',
                    },
                    Comments: [],
                    Blog: null,
                    Tags: [],
                  },
                  __typename: 'ResourceEdge',
                },
                {
                  node: {
                    id: 'ckaguje55248r080063orbko0',
                    updatedAt: '2020-05-21T14:04:17.360Z',
                    name: 'Смотрите пп 2 и 3. У вас шаблон foo.tpl имеется? С',
                    uri:
                      '/comments/topics/gonki-na-skorost-chast-vtoraya.-uskorenie-modx-revo-bolee-chem-v-8-raz.html/smotrite-pp-2-i-3.-u-vas-shablon-foo.tpl-imeetsya-s',
                    longtitle: null,
                    __typename: 'Resource',
                    CreatedBy: {
                      id: 'cjoe87z9f001b0d9683ysg0m4',
                      username: 'Fi1osof',
                      fullname: 'Николай',
                      image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
                      __typename: 'User',
                    },
                    Comments: [],
                    Blog: null,
                    Tags: [],
                  },
                  __typename: 'ResourceEdge',
                },
              ],
              __typename: 'ResourceConnection',
            },
          }

          break
      }

      // console.log('data', data);

      return {
        loading: false,
        error: null,
        data,
      }
    },
  }
})

describe('TopicsPage', () => {
  it('Render TopicsPage', async () => {
    const tree = await appRender(
      <TopicsPage
      // title="Test RableView"
      />
    )

    // console.log('tree', tree.container.outerHTML);

    expect(tree.container.querySelectorAll('table tbody tr').length).toBe(10)
  })
})
