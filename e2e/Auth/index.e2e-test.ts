import 'cypress-graphql-mock-network'
import { checkAuthority, initMockServer } from 'e2e/helpers/mock'

describe('Check Authority', () => {
  beforeEach(() => {
    initMockServer()
  })

  before(() => {
    cy.visit('/people/')
  })

  after(() => {
    cy.mockNetworkReset()
  })

  checkAuthority({})
})

export default true
