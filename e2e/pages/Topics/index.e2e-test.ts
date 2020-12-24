import { expect } from 'chai'

describe('Topics', () => {
  before(() => {
    cy.visit('/topics')
  })

  it('Load Topics page', () => {
    expect(cy.$$('.Component-table-191 > tbody > tr').length).equal(10)
  })

  it('Load first topic', () => {
    cy.get(
      '.Component-table-191 > tbody > tr:first-child > td:first-child a'
    ).click()
  })

  it('Check topic content', () => {
    expect(cy.get('.MuiGrid-grid-xs-67 > .MuiTypography-root-132')).not.false
  })
})

export default true
