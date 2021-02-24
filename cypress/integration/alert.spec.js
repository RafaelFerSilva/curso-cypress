/// <reference types="cypress" />

describe('Work with alerts', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Alert', () => {
        cy.get('#alert').click()
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Alert Simples')
        })
    })

    it('Alert com mock', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
        
    })

    it('Confirm', () => {
        cy.on('window:confirm', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Confirm Simples')
        })
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Confirmado')
        })
        cy.get('#confirm').click()
    })

    it('Deny', () => {
        cy.on('window:confirm', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Confirm Simples')
            return false
        })
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Negado')
        })
        cy.get('#confirm').click()
    })

    it.only('Prompt', () => {
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('42')
        })
        cy.on('window:prompt', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Era 42')
            return false
        })
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal(':D')
        })
        cy.get('#prompt').click()
    })

    it('Desafio', () => {
        cy.get('#formNome').type('Rafael')

        const stubNome = cy.stub().as('alertaNome')
        cy.on('window:alert', stubNome)
        cy.get('#formCadastrar').click().then(() => {
            expect(stubNome.getCall(0)).to.be.calledWith('Sobrenome eh obrigatorio')
        })

        cy.get('[data-cy=dataSobrenome]').type('Silva')

        const stubSobreNome = cy.stub().as('alertaSobreNome')
        cy.on('window:alert', stubSobreNome)
        cy.get('#formCadastrar').click().then(() => {
            expect(stubSobreNome.getCall(1)).to.be.calledWith('Sexo eh obrigatorio')
        })

        cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar').click()
        cy.get('#resultado > span').should('have.text', 'Cadastrado!')
    })
})