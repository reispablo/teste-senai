/// <reference types="cypress" />

const usuarioValido = {
  email: 'testesenai@gmail.com',
  senha: '123456',
}

const realizarLogin = (email, senha) => {
  if (email) {
    cy.get('#email').type(email)
  }

  if (senha) {
    cy.get('#senha').type(senha)
  }

  cy.contains('button', 'Entrar').click()
}

describe('login - seu barriga', () => {
  beforeEach(() => {
    cy.visit('https://seubarriga.wcaquino.me/login')
  })

  it('exibe o formulario de login', () => {
    cy.get('.jumbotron').should('be.visible').within(() => {
      cy.get('form')
        .should('have.attr', 'action', '/logar')
        .and('have.attr', 'method', 'post')

      cy.get('#email')
        .should('be.visible')
        .and('have.attr', 'name', 'email')
        .and('have.attr', 'type', 'email')
        .and('have.attr', 'placeholder', 'Email')

      cy.get('#senha')
        .should('be.visible')
        .and('have.attr', 'name', 'senha')
        .and('have.attr', 'type', 'password')
        .and('have.attr', 'placeholder', 'Password')

      cy.contains('button', 'Entrar').should('be.visible')
    })
  })

  it('realiza login com sucesso', () => {
    realizarLogin(usuarioValido.email, usuarioValido.senha)

    cy.get('.alert-success')
      .should('be.visible')
      .and('contain', 'Bem vindo, teste senai!')

    cy.location('pathname').should('eq', '/logar')
    cy.contains('a', 'Sair').should('be.visible')
  })

  it('exibe erro ao informar credenciais invalidas', () => {
    realizarLogin('usuario_invalido@teste.com', 'senhaerrada')

    cy.get('.alert-danger')
      .should('be.visible')
      .and('contain', 'Problemas com o login do usuário')

    cy.location('pathname').should('eq', '/logar')
  })

  it('exibe erro ao tentar logar sem email', () => {
    realizarLogin(null, '123456')

    cy.contains('.alert-danger', 'Email é um campo obrigatório')
      .should('be.visible')

    cy.location('pathname').should('eq', '/logar')
  })

  it('exibe erro ao tentar logar sem senha', () => {
    realizarLogin(usuarioValido.email, null)

    cy.contains('.alert-danger', 'Senha é um campo obrigatório')
      .should('be.visible')

    cy.location('pathname').should('eq', '/logar')
  })

  it('exibe erro ao tentar logar com todos os campos vazios', () => {
    realizarLogin(null, null)

    cy.get('.alert-danger').should('have.length', 2)
    cy.contains('.alert-danger', 'Email é um campo obrigatório')
      .should('be.visible')
    cy.contains('.alert-danger', 'Senha é um campo obrigatório')
      .should('be.visible')

    cy.location('pathname').should('eq', '/logar')
  })

  it('nao envia o formulario com email em formato invalido', () => {
    cy.get('#email').type('email-invalido')
    cy.get('#senha').type('123456')
    cy.contains('button', 'Entrar').click()

    cy.get('#email').should('match', ':invalid')
    cy.location('pathname').should('eq', '/login')
  })
})
