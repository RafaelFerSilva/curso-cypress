const locators = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },

    MENU: {
        HOME: '[data-test=menu-home]',
        SETTINGS: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTACAO: '[data-test=menu-movimentacao]',
        EXTRATO: '[data-test=menu-extrato]'
    },

    CONTAS: {
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        XP_BTN_ALTERAR: (contaName) => `//table//td[normalize-space()="${contaName}"]/..//i[contains(@class, "fa-edit")]`
    },

    MOVIMENTACAO: {
        DESCRICAO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERRESADO: '[data-test=envolvido]',
        CONTA: '[data-test=conta]',
        STATUS: '[data-test=status]',
        BTN_SALVAR: '.btn-primary'
    },

    EXTRATO: {
        XP_BUSCA_ELEMENTO: (descricao, value) => `//li[@data-test="mov-row"]//span[normalize-space()="${descricao}"]//following-sibling::small[contains(.,"${value}")]`,
        XP_REMOVER_ELEMENTO: (descricao) => `//span[normalize-space()="${descricao}"]//ancestor-or-self::li[@data-test="mov-row"]//div//i[contains(@class, "fa-trash-alt")]`
    },

    SALDO: {
        XP_SALDO_CONTA: (descricao, value) => `//td[normalize-space()="${descricao}"]//following-sibling::td[contains(., "${value}")]`
    },

    MESSAGE: '.toast-message',
}

export default locators;