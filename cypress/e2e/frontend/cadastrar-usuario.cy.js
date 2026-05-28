/// <reference types="cypress" />

describe('cadastrar usuario', () => {

  const email = `usuario_${Date.now()}@teste.com`

  beforeEach(() => {
    cy.visit('https://seubarriga.wcaquino.me/cadastro')
  })

  it('cadastrar usuario - sucesso', () => {

    cy.get('[name="nome"]').type('Usuario Teste')
    cy.get('[name="email"]').type(email)
    cy.get('[name="senha"]').type('123456')
    cy.get('input[type="submit"]').click()

    cy.get('.alert-success').should('be.visible')
  })

  it('cadastrar usuario - email ja cadastrado', () => {
    cy.get('[placeholder="Nome"]').type('Usuario Existente')
    cy.get('[placeholder="Email"]').type('pablo.reis@px.center')
    cy.get('[placeholder="Password"]').type('123456')
    cy.get('input[type="submit"]').click()

    cy.get('.alert-danger').should('be.visible')
  })

  it('cadastrar usuario - campo nome em branco', () => {
    cy.get('[placeholder="Email"]').type('teste@teste.com')
    cy.get('[placeholder="Password"]').type('123456')
    cy.get('input[type="submit"]').click()

    cy.get('.alert-danger').should('be.visible')
  })

  it('cadastrar usuario - campo email em branco', () => {
    cy.get('[placeholder="Nome"]').type('Usuario Teste')
    cy.get('[placeholder="Password"]').type('123456')
    cy.get('input[type="submit"]').click()

    cy.get('.alert-danger').should('be.visible')
  })

  it('cadastrar usuario - campo senha em branco', () => {
    cy.get('[placeholder="Nome"]').type('Usuario Teste')
    cy.get('[placeholder="Email"]').type('teste@teste.com')
    cy.get('input[type="submit"]').click()

    cy.get('.alert-danger').should('be.visible')
  })

  it('cadastrar usuario - todos os campos em branco', () => {
    cy.get('input[type="submit"]').click()

    cy.get('.alert-danger').should('be.visible')
  })

})
