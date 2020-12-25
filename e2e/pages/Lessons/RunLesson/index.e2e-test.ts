import 'cypress-graphql-mock-network'
import { expect } from 'chai'
import {
  AuthFormUsersConnectionResultFragment,
  AuthFormUsersConnectionQueryVariables,
  FragmentAuthPayloadFragment,
} from 'src/modules/gql/generated'

// TODO https://github.com/warrenday/graphql-mock-network/issues/2

import user from './mock/user'
import codeChallenge from './mock/codeChallenge'

const checkAuth = true

describe('Run Lesson', () => {
  beforeEach(() => {
    cy.readFile('./src/modules/gql/generated/schema.json').then((schema) => {
      cy.mockNetwork({
        schema,
        mocks: {
          DateTime: (source) => source,
          Json: (source) => source,
          Query: () => {
            return {
              me: () => null,
              usersConnection: (): AuthFormUsersConnectionResultFragment => {
                return {
                  aggregate: {
                    count: 0,
                  },
                  edges: [],
                }
              },
              codeChallenge: () => codeChallenge,
            }
          },
        },
      })
    })
  })

  // afterEach(() => {
  //   cy.wait(1000)
  // })

  it('Load Lesson', () => {
    cy.visit('/learn/exercises/bd7123c9c441eddfaeb4bdef')
  })

  if (checkAuth) {
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

  describe('Run test', () => {
    it('Run test', () => {
      cy.wait(200)

      cy.get(
        '.styles__ToolPanelStyled-sc-__sc-12nzu76-0 > :nth-child(1)'
      ).click()

      /**
       * Should be error
       */

      /**
       * Check that test failed
       */
      cy.get(
        '.styles__CodeChallengeOutputViewStyled-sc-__sc-19ze6m7-0 > div'
      ).then((node) => {
        expect(node[0].innerText).eq('Unspecified AssertionError')
      })

      cy.wait(500)

      cy.get('.view-line:last-child').click().type('// Some comment{enter}')
      // .type('{enter}')

      cy.get('.view-line:last-child').click().type('/* {enter}')

      cy.get('.view-line:last-child').click().type('Multiline comment{enter}')

      cy.get('.view-line:last-child').click().type('*/{enter}')

      cy.wait(500)
      cy.get(
        '.styles__ToolPanelStyled-sc-__sc-12nzu76-0 > :nth-child(1)'
      ).click()

      cy.wait(1000)
    })

    it('Close success modal', () => {
      expect(cy.get('div[role=CodeChallengeSuccess]')).not.null

      cy.get('div[role=CodeChallengeSuccess] [role=message]').then((node) => {
        expect(node[0].innerText).eq('Задание успешно выполнено!')
      })

      cy.get('div[role=CodeChallengeSuccess] button[role=close]').click()
    })
  })
})

export default true
