/* eslint-disable no-redeclare */
/* eslint-disable @typescript-eslint/no-namespace */
import 'cypress-graphql-mock-network'
import { expect } from 'chai'

declare global {
  namespace Cypress {
    interface ApplicationWindow {
      monaco?: typeof import('monaco-editor')
    }
  }
}

describe('Run ResponsiveWebDesign Lesson', () => {
  it('Load lesson', () => {
    cy.visit('/learn/exercises/bad87fee1348bd9aedf0887a')
  })

  describe('Run test', () => {
    it('Run test', () => {
      cy.wait(200)

      cy.get(
        '.styles__ToolPanelStyled-sc-__sc-12nzu76-0 > :nth-child(1)'
      ).click()

      /**
       * Check that test failed
       */
      cy.get(
        '.styles__CodeChallengeOutputViewStyled-sc-__sc-19ze6m7-0 > div'
      ).then((node) => {
        expect(node[0].innerText).eq('Unspecified AssertionError')
      })

      cy.wait(1000)

      /**
       * Get monaco editor and add content
       */
      cy.window().then((win) => {
        const monaco = win.monaco

        expect(!!monaco).true

        if (monaco) {
          const model = monaco.editor.getModels()[0]

          model.setValue(model.getValue() + '<h2>CatPhotoApp</h2>')
        }
      })

      cy.wait(1000)

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
