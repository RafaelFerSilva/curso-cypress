/// <reference types="cypress" />

import '../../support/commandsContas'
import loc from '../../support/locators'

describe('Should test at a functional tests', () => {
    let contaName

    before(() => {
        cy.server()
        cy.route({
            method: 'POST',
            url: '/signin',
            response: {
                id: 1000,
                nome: 'Usuario Falso',
                token: 'Xablau'
            }
        }).as('signin')

        cy.route({
            method: 'GET',
            url: '/saldo',
            response: [{
                "conta_id": 999,
                "conta": "Carteira",
                "saldo": "100"
            },
            {
                "conta_id": 1000,
                "conta": "Banco",
                "saldo": "10000000"
            }]
        }).as('saldo')
        cy.seuBarrigaLogin('a@a', 'xablau')
    })

    beforeEach(() => {
        contaName = `Conta de teste - ${Date.now()}`
    })

    after(() => {
        cy.clearLocalStorage()
    })

    it('Should create an account', () => {
        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {"id":1,"nome":"Carteira","visivel":true,"usuario_id":1},
                {"id":2,"nome":"Banco","visivel":true,"usuario_id":1},
            ]
        })

        cy.route({
            method: 'POST',
            url: '/contas',
            response: [
                {"id":7,"nome":`${contaName}`,"visivel":true,"usuario_id":1}
            ]
        })
        cy.acessarMenuContas()

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {"id":1,"nome":"Carteira","visivel":true,"usuario_id":1},
                {"id":2,"nome":"Banco","visivel":true,"usuario_id":1},
                {"id":7,"nome":`${contaName}`,"visivel":true,"usuario_id":1},
            ]
        })
        
        cy.adicionarConta(contaName)
        cy.checkToastMessage('Conta inserida com sucesso')
    })

    it('Should Update an account', () => {
        cy.adicionarConta(contaName)
        cy.checkToastMessage('Conta inserida com sucesso')

        let newContaName = `Conta Alterada - ${Date.now()}`
        cy.acessarMenuContas()
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