/// <reference types="cypress" />

describe('Dinamic Tests', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    const foods = [ 'Carne', 'Frango', 'Pizza', 'Vegetariano']
    foods.forEach(food => {
        it(`Cadastro com comida variada -> ${food}`, () => {
            cy.get('#formNome').type('Usuario')
            cy.get('[data-cy=dataSobrenome]').type('Qualquer')
            cy.get(`[name=formSexo][value=F`).click()
            cy.xpath(`//label[contains(., '${food}')]//preceding-sibling::input`).click()
            cy.get('#formEscolaridade').select('Doutorado')
            cy.get('#formEsportes').select('Corrida')
            cy.get('#formCadastrar').click()
            cy.get('#resultado > span').should('have.text', 'Cadastrado!')
        })
    })

    it.only(`Cadastro todas as comidas`, () => {
        cy.get('#formNome').type('Usuario')
        cy.get('[data-cy=dataSobrenome]').type('Qualquer')
        cy.get(`[name=formSexo][value=F`).click()

        cy.get(`[name=formComidaFavorita]`).each($el => {
            if($el.val() != 'vegetariano')
            cy.wrap($el).click()
        })

        cy.get('#formEscolaridade').select('Doutorado')
        cy.get('#formEsportes').select('Corrida')
        cy.get('#formCadastrar').click()
        cy.get('#resultado > span').should('have.text', 'Cadastrado!')
        // cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
    })
})