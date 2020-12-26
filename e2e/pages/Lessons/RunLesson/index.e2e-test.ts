import 'cypress-graphql-mock-network'
import { expect } from 'chai'
// import { checkAuthority, initMockServer } from 'e2e/helpers/mock'
// import {
//   AuthFormUsersConnectionResultFragment,
//   AuthFormUsersConnectionQueryVariables,
//   FragmentAuthPayloadFragment,
// } from 'src/modules/gql/generated'

// TODO https://github.com/warrenday/graphql-mock-network/issues/2

// import user from './mock/user'
// import codeChallenge from './mock/codeChallenge'

describe('Run Lesson', () => {
  it('Load lesson', () => {
    cy.visit('/learn/exercises/bd7123c9c441eddfaeb4bdef')
  })

  describe('Run test', () => {
    // before(() => {

    //   cy.mockNetworkAdd({
    //     Query: () => {
    //       return {
    //         codeChallenge: () => codeChallenge,
    //       }
    //     },
    //   })

    // })

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
