/// <reference types="cypress" />

import '../../support/commandsContas'
import loc from '../../support/locators'

describe('Should test at a functional tests', () => {
    let contaName

    before(() => {
        cy.seuBarrigaLogin('a@a', 'a')
    })

    beforeEach(() => {
        contaName = `Conta de teste - ${Date.now()}`
    })

    afterEach(() => {
        cy.resetData()
    })

    it('Should create an account', () => {
        cy.adicionarConta(contaName)
        cy.checkToastMessage('Conta inserida com sucesso')
    })

    it('Should Update an account', () => {
        cy.adicionarConta(contaName)
        cy.checkToastMessage('Conta inserida com sucesso')

        let newContaName = `Conta Alterada - ${Date.now()}`
        cy.alterarConta(contaName, newContaName)
    })

    it('Should not create an account with same name', () => {
        cy.adicionarConta(contaName)
        cy.checkToastMessage('Conta inserida com sucesso')
        
        cy.adicionarConta(contaName)
        cy.checkToastMessage('status code 400')
    })

    it('Should add new transactions', () => {
        cy.adicionarConta(contaName)
        cy.checkToastMessage('Conta inserida com sucesso')
        let descricao = `Descrição - ${Date.now()}`
        let value = Math.floor(Math.random() * 1000)
        let interresado = `Interresado - ${Date.now()}`
        cy.adicionarMovimentacao(descricao, value, interresado, contaName)
        cy.VerificarElementoNoExtrato(descricao, value)
    })

    it('Should get balance', () => {
        cy.adicionarConta(contaName)
        cy.checkToastMessage('Conta inserida com sucesso')
        let descricao = `Descrição - ${Date.now()}`
        let value = Math.floor(Math.random() * 1000)
        let interresado = `Interresado - ${Date.now()}`
        cy.adicionarMovimentacao(descricao, value, interresado, contaName)
        cy.VerificarElementoNoExtrato(descricao, value)

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.XP_SALDO_CONTA(contaName, value)).should('exist')
    })

    it('Should remove a transactions', () => {
        cy.adicionarConta(contaName)
        cy.checkToastMessage('Conta inserida com sucesso')
        let descricao = `Descrição - ${Date.now()}`
        let value = Math.floor(Math.random() * 1000)
        let interresado = `Interresado - ${Date.now()}`
        cy.adicionarMovimentacao(descricao, value, interresado, contaName)
        cy.VerificarElementoNoExtrato(descricao, value)

        cy.get(loc.MENU.EXTRATO).click()
        cy.removertransaction(descricao)
    })
})