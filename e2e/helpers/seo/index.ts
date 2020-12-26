import { expect } from 'chai'

type SeoTestProps = {
  /**
   * Доступен ли для индексации поисковыми роботами
   */
  searchable: boolean
}

export default (props: SeoTestProps) => {
  const { searchable } = props

  describe('SEO', () => {
    it(`Is ${searchable ? 'searchable' : 'not searchable'}`, () => {
      cy.get('head [name=robots]').then(($el) => {
        expect($el.attr('content')).eq(
          searchable ? 'index,follow' : 'noindex,nofollow'
        )
      })
    })

    describe(`Title and description`, () => {
      let title = ''
      let description = ''

      it('Is title exists', () => {
        cy.get('head title').then(($el) => {
          title = $el.text() || ''

          expect(title).not.eq('')
        })
      })

      it('Is description exists', () => {
        cy.get('head [name=description]').then(($el) => {
          description = $el.attr('content') || ''

          expect(description).not.eq('')
        })
      })

      it('is title != description', () => {
        expect(title !== description).true
      })
    })
  })
}
