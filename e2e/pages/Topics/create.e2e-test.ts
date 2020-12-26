// import { expect } from 'chai'

import seo from 'e2e/helpers/seo'

describe('Create Topic', () => {
  before(() => {
    cy.visit('/add-topic.html')
  })

  // it('Check noindex', () => {
  //   cy.get('head [name=robots]').then($el => expect($el.attr("content")).eq('noindex,nofollow'));

  // })

  seo({
    searchable: false,
  })
})

export default true
