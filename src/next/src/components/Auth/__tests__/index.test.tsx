import React from 'react'
import { appRender } from 'src/tests/utils'
import Auth from '..'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: {},
      asPath: '/',
      events: {
        on: () => {
          // eslint-disable-next-line no-console
          console.log('mock router events on')
        },
        off: () => {
          // eslint-disable-next-line no-console
          console.log('mock router events off')
        },
      },
    }
  },
}))

const loginCanceled = () => {
  return null
}

const loginComplete = () => {
  return null
}

describe('Auth', () => {
  it('Render Auth closed', () => {
    appRender(
      <Auth
        open={false}
        useMetamask={false}
        loginCanceled={loginCanceled}
        loginComplete={loginComplete}
        showRegForm={true}
      />
    )
  })

  it('Render Auth opened', () => {
    appRender(
      <Auth
        open={true}
        useMetamask={false}
        loginCanceled={loginCanceled}
        loginComplete={loginComplete}
        showRegForm={true}
      />
    )
  })
})
