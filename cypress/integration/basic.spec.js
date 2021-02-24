/// <reference types="cypress" />

describe('Cypress basics', () => {
    it.only('Should visit a page and assert title', () => {

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        
        cy.title().should('be.equal', 'Campo de Treinamento')
        cy.title().should('contain', 'Campo')

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Campo')

        cy.title().then(title => {
            console.log(title)
        })

        let synTitle

        cy.title().then(title => {
            cy.get('#formNome').type(title)
            synTitle = title
        })

        cy.get('[data-cy="dataSobrenome"]').then($el => {
            $el.val(synTitle)
        })

        cy.get('[data-cy="dataSobrenome"]').then($el => {
            cy.wrap($el).type(synTitle)
        })
    })

    it('Should find and interact with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.title().should('be.equal', 'Campo de Treinamento')

        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    })
})