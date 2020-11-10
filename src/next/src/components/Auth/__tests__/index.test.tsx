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

    // await act(async () => {
    //   await new Promise((resolve) => setTimeout(resolve, 1000)) // wait for response
    // })

    // eslint-disable-next-line no-console
    // console.log('tree', tree.container.outerHTML)

    // expect(
    //   tree.container.querySelectorAll('#comments > .comment').length
    // ).toBe(3)
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

    // await act(async () => {
    //   await new Promise((resolve) => setTimeout(resolve, 1000)) // wait for response
    // })

    // eslint-disable-next-line no-console
    // console.log('tree', tree.container.outerHTML)

    // expect(
    //   tree.container.querySelectorAll('#comments > .comment').length
    // ).toBe(3)
  })
})
