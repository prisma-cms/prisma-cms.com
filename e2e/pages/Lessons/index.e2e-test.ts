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
      cy.get(':nth-child(3) > .MuiTypography-root-132')
        .contains('responsive-web-design')
        .click()
    })

    it('Expand 2st level menu', () => {
      cy.get(':nth-child(2) > .MuiTypography-root-132')
        .contains('Basic HTML and HTML5')
        .click()
    })

    it('Load Lesson page', () => {
      cy.get(':nth-child(2) > :nth-child(2) > a')
        .contains('Say Hello to HTML Elements')
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
