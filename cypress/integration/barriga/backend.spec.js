/// <reference types="cypress" />

import '../../support/commandsRest'

describe('Should test at a functional tests', () => {
    let contaNome
    let token

    before(() => {
        cy.getToken('a@a', 'a')
    })

    beforeEach(() => {
        // contaName = `Conta de teste - ${Date.now()}`
    })

    afterEach(() => {
        cy.resetRest(Cypress.env('token'))
    })

    it('Should create an account', () => {
        contaNome = `Conta de teste - ${Date.now()}`
        cy.createAccountByRest(contaNome)
    })

    it('Should Update an account', () => {
        let testContaNome = `Conta de teste - ${Date.now()}`
        cy.createAccountByRest(testContaNome)

        let newContaNome = `New Conta de teste - ${Date.now()}`
        cy.getAccountByName(testContaNome).then(contaId => cy.updateAccountByRest(contaId, newContaNome))
        
    })

    it('Should not create an account with same name', () => {
        let testContaNome = `Conta de teste - ${Date.now()}`
        cy.createAccountByRest(testContaNome)

        cy.shouldNotCreateAccountByRest(testContaNome)
    })

    it('Should add new transactions', () => {
        let testContaNome = `transaction - ${Date.now()}`
        cy.createAccountByRest(testContaNome)

        let data_pagamento = Cypress.moment().format('DD/MM/YYYY')
        let data_transacao = Cypress.moment().format('DD/MM/YYYY')
        let descricao = `Transação ${Date.now()}`
        let envolvido = `Envolvido ${Date.now()}`
        let tipo = 'REC'
        let status = true
        let value = Math.floor(Math.random() * 1000)
        cy.getAccountByName(testContaNome)
            .then(contaId => 
                cy.createTransactionsByRest(
                    contaId, 
                    data_pagamento,
                    data_transacao,
                    descricao,
                    envolvido,
                    tipo,
                    status,
                    value
                )
            )
    })

    it('Should get balance', () => {
        let testContaNome = `transaction - ${Date.now()}`
        cy.createAccountByRest(testContaNome)

        let data_pagamento = Cypress.moment().format('DD/MM/YYYY')
        let data_transacao = Cypress.moment().format('DD/MM/YYYY')
        let descricao = `Transação ${Date.now()}`
        let envolvido = `Envolvido ${Date.now()}`
        let tipo = 'REC'
        let status = true
        let value = Math.floor(Math.random() * 1000)

        cy.getAccountByName(testContaNome)
            .then(contaId => 
                cy.createTransactionsByRest(
                    contaId, 
                    data_pagamento,
                    data_transacao,
                    descricao,
                    envolvido,
                    tipo,
                    status,
                    value
                )
            )
        cy.getAccountByName(testContaNome).then(contaId => cy.checkAccountBallance(contaId, value))

        cy.getAccountByName(testContaNome)
            .then(contaId => 
                cy.getTransactionByDescription(descricao)
                    .then(res => cy.updateTransactionsByRest(
                        contaId,
                        res.id,
                        Cypress.moment(res.data_pagamento).format('DD/MM/YYYY'), 
                        Cypress.moment(res.data_transacao).format('DD/MM/YYYY'), 
                        res.descricao, 
                        res.envolvido,
                        res.status,
                        Math.floor(Math.random() * 1000)
                    )
                )
            )
        
    })

    it('Should remove a transactions', () => {
        let testContaNome = `transaction - ${Date.now()}`
        cy.createAccountByRest(testContaNome)

        let data_pagamento = Cypress.moment().format('DD/MM/YYYY')
        let data_transacao = Cypress.moment().format('DD/MM/YYYY')
        let descricao = `Transação ${Date.now()}`
        let envolvido = `Envolvido ${Date.now()}`
        let tipo = 'REC'
        let status = true
        let value = Math.floor(Math.random() * 1000)

        cy.getAccountByName(testContaNome)
            .then(contaId => 
                cy.createTransactionsByRest(
                    contaId, 
                    data_pagamento,
                    data_transacao,
                    descricao,
                    envolvido,
                    tipo,
                    status,
                    value
                )
            )
        cy.getAccountByName(testContaNome).then(contaId => cy.checkAccountBallance(contaId, value))

        cy.getTransactionByDescription(descricao)
            .then(res => cy.removeTransaction(
                    res.id
                )
            )
    })
})