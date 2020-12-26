/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { IMocks } from 'graphql-tools'
import {
  AuthFormUsersConnectionQueryVariables,
  AuthFormUsersConnectionResultFragment,
  FragmentAuthPayloadFragment,
} from 'src/modules/gql/generated'
import mockUser from './data/user'

type initMockServerProps = {
  mocks?: IMocks

  /**
   * If false, me query returns null
   */
  authed?: boolean
}

// const checkAuth = true

const user = mockUser

export const initMockServer = (props?: initMockServerProps) => {
  const mocks: IMocks = {
    ...((props && props.mocks) || {}),
  }

  if (props && props.authed === false) {
    // @ts-ignore
    mocks.Query = (source, args, ctx, info) => {
      const fields = {
        me: () => null,
        usersConnection: () => {
          return {
            aggregate: {
              count: 0,
            },
            edges: [],
          }
        },
      }

      if (props && props.mocks && props.mocks.Query) {
        Object.assign(fields, props.mocks.Query(source, args, ctx, info))
      }

      return fields
    }
  }

  cy.readFile('./src/modules/gql/generated/schema.json').then((schema) => {
    cy.mockNetwork({
      schema,
      mocks: {
        DateTime: () => {
          return new Date()
        },
        Json: () => {
          return {}
        },
        ...mocks,
      },
    })
  })
}

type checkAuthorityProps = {}

export const checkAuthority = (_props?: checkAuthorityProps) => {
  describe('Check authority', () => {
    it('Click login button', () => {
      cy.get('.MuiButton-label-157 > .MuiTypography-root-132').click()
    })

    it('Type login', () => {
      /**
       * Add mocks
       */
      cy.mockNetworkAdd({
        Query: () => ({
          usersConnection: (
            _source: null,
            args: AuthFormUsersConnectionQueryVariables
          ): AuthFormUsersConnectionResultFragment => {
            // console.log('usersConnection args', args);

            if (!args.where || args.where.search !== 'Fi1osof') {
              return {
                aggregate: {
                  count: 0,
                },
                edges: [],
              }
            }

            return {
              aggregate: {
                count: 1,
              },
              edges: [
                {
                  node: user,
                },
              ],
            }
          },
        }),
      })

      cy.wait(1000)

      cy.get('[role=dialog] input[name=search]').click().type('Fi1osof')

      /**
       * Add auth mock
       */
      cy.mockNetworkAdd({
        Mutation: () => ({
          signin: (): FragmentAuthPayloadFragment => {
            return {
              success: true,
              errors: [],
              data: user,
              token: 'foo-token',
            }
          },
        }),
        Query: () => ({
          me: () => user,
        }),
      })

      /**
       * Click auth button
       */
      cy.wait(500)

      cy.get('.MuiButton-flatPrimary-158 > .MuiButton-label-157').click()
    })
  })
}
