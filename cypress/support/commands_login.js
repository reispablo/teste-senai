import { loginLocators, loginTexts } from './locators/login.locators'

const obterEnv = (chave) => {
  const valor = Cypress.env(chave)

  expect(valor, `cypress.env.json deve conter ${chave}`).to.be.a('string').and.not.be.empty

  return valor
}

Cypress.Commands.add('acessarTelaLogin', () => {
  cy.visit(obterEnv('FRONTEND_URL'))
})

Cypress.Commands.add('preencherLogin', ({ email = obterEnv('USER'), senha = obterEnv('PASSWORD') } = {}) => {
  if (email) {
    cy.get(loginLocators.campoEmail).type(email)
  }

  if (senha) {
    cy.get(loginLocators.campoSenha).type(senha)
  }
})

Cypress.Commands.add('submeterLogin', () => {
  cy.contains(loginLocators.botaoEntrar, loginTexts.botaoEntrar).click()
})

Cypress.Commands.add('realizarLogin', (dadosLogin = {}) => {
  cy.preencherLogin(dadosLogin)
  cy.submeterLogin()
})

Cypress.Commands.add('validarFormularioLogin', () => {
  cy.get(loginLocators.formulario).should('be.visible').within(() => {
    cy.get(loginLocators.campoEmail)
      .should('be.visible')
      .and('have.attr', 'name', 'email')
      .and('have.attr', 'type', 'email')

    cy.get(loginLocators.campoSenha)
      .should('be.visible')
      .and('have.attr', 'name', 'senha')
      .and('have.attr', 'type', 'password')

    cy.contains(loginLocators.botaoEntrar, loginTexts.botaoEntrar).should('be.visible')
  })
})

Cypress.Commands.add('validarLoginComSucesso', () => {
  cy.get(loginLocators.alertaSucesso)
    .should('be.visible')
    .and('contain', loginTexts.mensagemSucesso)

  cy.location('pathname').should('eq', '/logar')
  cy.contains(loginLocators.linkSair, loginTexts.linkSair).should('be.visible')
})

Cypress.Commands.add('validarErroCredenciaisInvalidas', () => {
  cy.get(loginLocators.alertaErro)
    .should('be.visible')
    .and('contain', loginTexts.mensagemCredenciaisInvalidas)

  cy.location('pathname').should('eq', '/logar')
})

Cypress.Commands.add('validarErroEmailObrigatorio', () => {
  cy.contains(loginLocators.alertaErro, loginTexts.mensagemEmailObrigatorio)
    .should('be.visible')

  cy.location('pathname').should('eq', '/logar')
})

Cypress.Commands.add('validarErroSenhaObrigatoria', () => {
  cy.contains(loginLocators.alertaErro, loginTexts.mensagemSenhaObrigatoria)
    .should('be.visible')

  cy.location('pathname').should('eq', '/logar')
})

Cypress.Commands.add('validarEmailInvalido', () => {
  cy.get(loginLocators.campoEmail).should('match', ':invalid')
  cy.location('pathname').should('eq', '/login')
})
