import loc from './locators'

Cypress.Commands.add('seuBarrigaLogin', (nome, senha) => {
    cy.visit('https://barrigareact.wcaquino.me/')
    cy.get(loc.LOGIN.USER).type(nome)
    cy.get(loc.LOGIN.PASSWORD).type(senha)
    cy.get(loc.LOGIN.BTN_LOGIN).click()
    cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
})

Cypress.Commands.add('acessarMenuContas', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.CONTAS).click()
})

Cypress.Commands.add('acessarMenuMovimentacao', () => {
    cy.get(loc.MENU.MOVIMENTACAO).click()
})

Cypress.Commands.add('checkToastMessage', (message) => {
    cy.get(loc.MESSAGE).should('contain', message)
})

Cypress.Commands.add('adicionarConta', (contaName) => {
    cy.get(loc.CONTAS.NOME)
        .clear()
        .type(contaName)
    cy.get(loc.CONTAS.BTN_SALVAR).click()
})

Cypress.Commands.add('alterarConta', (contaName, newContaName) => {
    cy.xpath(loc.CONTAS.XP_BTN_ALTERAR(contaName)).click()
    cy.get(loc.CONTAS.NOME)
        .clear()
        .type(`${newContaName}`)
    
    cy.get(loc.CONTAS.BTN_SALVAR).click()
})

Cypress.Commands.add('resetData', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.RESET).click()
    cy.checkToastMessage('Dados resetados com sucesso!')
})

Cypress.Commands.add('adicionarMovimentacao', (descricao, valor, interresado, contaName) => {
    cy.acessarMenuMovimentacao()
    cy.get(loc.MOVIMENTACAO.DESCRICAO).type(descricao)
    cy.get(loc.MOVIMENTACAO.VALOR).type(valor)
    cy.get(loc.MOVIMENTACAO.INTERRESADO).type(interresado)
    cy.get(loc.MOVIMENTACAO.CONTA).select(contaName)
    cy.get(loc.MOVIMENTACAO.STATUS).click()
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
    cy.checkToastMessage('Movimentação inserida com sucesso')
})

Cypress.Commands.add('VerificarElementoNoExtrato', (descrição, valor) => {
    cy.xpath(loc.EXTRATO.XP_BUSCA_ELEMENTO(descrição, valor)).should('exist')
})

Cypress.Commands.add('removertransaction', (descrição) => {
    cy.xpath(loc.EXTRATO.XP_REMOVER_ELEMENTO(descrição)).click()
    cy.checkToastMessage('Movimentação removida com sucesso')
})
