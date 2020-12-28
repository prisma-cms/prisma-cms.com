// import '@jest/core'
// import 'cypress';
// import { before } from 'mocha';

describe('Check all pages', () => {
  afterEach(() => {
    cy.wait(1000)
  })

  describe('Lessons', () => {
    it('Load Lessons page', () => {
      cy.visit('/learn/sections')
    })

    it('Expand 1st level menu', () => {
      cy.get(
        '.styles__CodeChallengeBlocksPageStyled-sc-__sc-1qerrix-0 > :nth-child(3)'
      )
        .contains('responsive-web-design')
        .click()
    })

    it('Expand 2st level menu', () => {
      cy.get(':nth-child(3) > :nth-child(2)')
        .contains('Basic HTML and HTML5')
        .click()
    })

    it('Load Lesson page', () => {
      cy.get(':nth-child(2) > :nth-child(2) > a')
        .contains('Скажи Hello элементам HTML')
        .click()
    })

    describe('Lesson', () => {
      it('Check title', () => {
        cy.get('.styles__ChallengeTitleStyled-sc-__f1zxxn-0').contains(
          'Скажи Hello элементам HTML'
        )
      })
    })
  })
})

export default true
