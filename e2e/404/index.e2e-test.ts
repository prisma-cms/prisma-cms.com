// import '@jest/core'
// import 'cypress';
// import { before } from 'mocha';

describe('404 page', () => {
  before(() => {
    cy.visit('/404', {
      failOnStatusCode: false,
    })
  })

  describe('Load 404 page', () => {
    it('Check content', () => {
      cy.contains('#content > h2', 'Страница не найдена')
    })
  })
})

export default true
