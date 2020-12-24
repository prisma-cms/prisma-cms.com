// import '@jest/core'
// import 'cypress';
// import { before } from 'mocha';

describe('MainPage', () => {
  before(() => {
    cy.visit('/')
  })

  describe('Load MainPage', () => {
    it('Check content', () => {
      cy.contains('.MuiTypography-root-132 > a', 'PrismaCMS')
    })
  })
})

export default true
