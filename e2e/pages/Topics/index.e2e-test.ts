import { expect } from 'chai'
import seo from 'e2e/helpers/seo'

describe('Topics', () => {
  before(() => {
    cy.visit('/topics')
  })

  seo({
    searchable: true,
  })

  it('Load Topics page', () => {
    expect(cy.$$('table > tbody > tr').length).equal(10)
  })

  it('Load first topic', () => {
    cy.get('table > tbody > tr:first-child > td:first-child a').click()
  })

  it('Check topic content', () => {
    expect(cy.get('#content .header h1')).not.false
  })
})

export default true
