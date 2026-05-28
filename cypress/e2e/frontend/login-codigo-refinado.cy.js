/// <reference types="cypress" />

describe('login - codigo refinado', () => {
  beforeEach(() => {
    cy.acessarTelaLogin()
  })

  it('exibe os elementos do formulario de login', () => {
    cy.validarFormularioLogin()
  })

  it('realiza login com usuario valido do cypress.env', () => {
    cy.realizarLogin()
    cy.validarLoginComSucesso()
  })

  it('exibe erro ao informar senha invalida', () => {
    cy.realizarLogin({
      senha: 'senha-invalida',
    })

    cy.validarErroCredenciaisInvalidas()
  })

  it('exibe erro ao tentar logar sem email', () => {
    cy.realizarLogin({
      email: null,
    })

    cy.validarErroEmailObrigatorio()
  })

  it('exibe erro ao tentar logar sem senha', () => {
    cy.realizarLogin({
      senha: null,
    })

    cy.validarErroSenhaObrigatoria()
  })

  it('nao envia o formulario com email em formato invalido', () => {
    cy.realizarLogin({
      email: 'email-invalido',
    })

    cy.validarEmailInvalido()
  })
})
