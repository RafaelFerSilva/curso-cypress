
Cypress.Commands.add('getToken', (usuario, senha) => {
    cy.request({
        method: 'POST',
        url: '/signin',
        body: {
            email: usuario,
            redirecionar: false,
            senha: senha
        }
    }).its('body.token').should('not.be.empty')
        .then(token => {
            Cypress.env('token', token)
            return token
        })
})

Cypress.Commands.add('resetRest', () => {
    cy.request({
        method: 'GET',
        url: '/reset',
        headers: { Authorization: `JWT ${Cypress.env('token')}`}
    }).its('status').should('be.equal', 200)
})

Cypress.Commands.add('createAccountByRest', (contaNome) => {
    cy.request({
        method: 'POST',
        url: '/contas',
        headers: { Authorization: `JWT ${Cypress.env('token')}`},
        body: {
            nome: contaNome
        }
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).to.be.equal(201)
        expect(res.body).to.have.property('id')
        expect(res.body).to.have.property('nome', contaNome)
        return res.body.id
    })
})

Cypress.Commands.add('shouldNotCreateAccountByRest', (contaNome) => {
    cy.request({
        method: 'POST',
        url: '/contas',
        headers: { Authorization: `JWT ${Cypress.env('token')}`},
        body: {
            nome: contaNome
        },
        failOnStatusCode: false
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).to.be.equal(400)
        expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
    })
})

Cypress.Commands.add('getAccountByName', (accountName) => {
    cy.request({
        method: 'GET',
        url: `/contas?nome=${accountName}`,
        headers: { Authorization: `JWT ${Cypress.env('token')}`},
        body: {
            nome: accountName
        }
    }).then(res => {
        return res.body[0].id
    })
})

Cypress.Commands.add('updateAccountByRest', (contaId, newName) => {
    cy.request({
        method: 'PUT',
        url: `/contas/${contaId}`,
        headers: { Authorization: `JWT ${Cypress.env('token')}`},
        body: {
            nome: newName
        }
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).to.be.equal(200)
        expect(res.body).to.have.property('id')
        expect(res.body).to.have.property('nome', newName)
    })
})

Cypress.Commands.add('createTransactionsByRest', (
    contaId,
    data_pagamento, 
    data_transacao, 
    descricao, 
    envolvido,
    tipo,
    status,
    valor) => {
    cy.request({
        method: 'POST',
        url: `/transacoes`,
        headers: { Authorization: `JWT ${Cypress.env('token')}`},
        body: {
            conta_id: contaId,
            data_pagamento: data_pagamento,
            data_transacao: data_transacao,
            descricao: descricao,
            envolvido: envolvido,
            status: status,
            tipo: tipo,
            valor: valor,
        }
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).to.be.equal(201)
        expect(res.body).to.have.property('conta_id')
        expect(res.body).to.have.property('valor')
    })
})

Cypress.Commands.add('updateTransactionsByRest', (
    contaId,
    transactionId, 
    data_pagamento, 
    data_transacao, 
    descricao, 
    envolvido,
    status,
    valor) => {
    cy.request({
        method: 'PUT',
        url: `/transacoes/${transactionId}`,
        headers: { Authorization: `JWT ${Cypress.env('token')}`},
        body: {
            conta_id: contaId,
            data_pagamento: data_pagamento,
            data_transacao: data_transacao,
            descricao: descricao,
            envolvido: envolvido,
            status: status,
            valor: valor,
        }
    }).its('status').should('be.equal', 200)
})

Cypress.Commands.add('checkAccountBallance', (contaId, value) => {
    cy.request({
        method: 'GET',
        url: `/saldo`,
        headers: { Authorization: `JWT ${Cypress.env('token')}`},
    }).then(res => {
        let saldoConta = null
        res.body.forEach(c => {
            if(c.conta_id === contaId) saldoConta = c.saldo
        })
        
        expect(saldoConta).to.be.equal(`${value}.00`)
    })
})

Cypress.Commands.add('getTransactionByDescription', (descricao) => {
    cy.request({
        method: 'GET',
        url: `/transacoes`,
        headers: { Authorization: `JWT ${Cypress.env('token')}`},
        qs: {descricao: descricao},
    }).then(res => {
        return res.body[0]
    })
})

Cypress.Commands.add('removeTransaction', (transactionId) => {
    cy.request({
        method: 'DELETE',
        url: `/transacoes/${transactionId}`,
        headers: { Authorization: `JWT ${Cypress.env('token')}`},
        qs: {id: transactionId},
    }).its('status').should('be.equal', 204)
})