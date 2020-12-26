import { MeUserFragment } from 'src/modules/gql/generated'

const mockUser: MeUserFragment = {
  id: 'mock_user_id',
  createdAt: new Date('2012-04-09T20:00:00.000Z'),
  updatedAt: new Date('2020-12-12T01:11:30.026Z'),
  username: 'Fi1osof',
  password: null,
  fullname: 'Nikolay Lanets',
  image: '9da9e7e309fd4e77cf42c02a7a42142e.jpeg',
  hasEmail: true,
  hasPhone: false,
  hidden: null,
  EthAccounts: [],
  Timers: [],
}

export default mockUser
