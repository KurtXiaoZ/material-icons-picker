/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

/*
Cypress.Commands.add('isNotInViewport', element => {
    cy.get(element).then($el => {
      const bottom = Cypress.$(cy.state('window')).height()
      const rect = $el[0].getBoundingClientRect()
  
      expect(rect.top).to.be.greaterThan(bottom)
      expect(rect.bottom).to.be.greaterThan(bottom)
      expect(rect.top).to.be.greaterThan(bottom)
      expect(rect.bottom).to.be.greaterThan(bottom)
    })
  })
  
Cypress.Commands.add('isInViewport', element => {
  cy.get(element).then($el => {
    const bottom = Cypress.$(cy.state('window')).height()
    const rect = $el[0].getBoundingClientRect()

    expect(rect.top).not.to.be.greaterThan(bottom)
    expect(rect.bottom).not.to.be.greaterThan(bottom)
    expect(rect.top).not.to.be.greaterThan(bottom)
    expect(rect.bottom).not.to.be.greaterThan(bottom)
  })
})

declare global {
    namespace Cypress {
        interface Chainable {
            isNotInViewport(element: any): Chainable<void>
            isInViewport(element: any): Chainable<void>
        }
    }
}

export {};*/
