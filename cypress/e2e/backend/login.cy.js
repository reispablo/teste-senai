/// <reference types="cypress" />

const obterEnv = (chave) => {
  const valor = Cypress.env(chave)

  expect(valor, `cypress.env.json deve conter ${chave}`).to.be.a('string').and.not.be.empty

  return valor
}

const obterBackendUrl = () => obterEnv('BACKEND_URL').replace(/\/$/, '')

const requisitarLogin = (body) => {
  return cy.request({
    method: 'POST',
    url: `${obterBackendUrl()}/signin`,
    failOnStatusCode: false,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
}

const validarTokenAusente = (body) => {
  expect(body || {}).not.to.have.property('token')
}

describe('login backend', () => {
  it('realiza login com sucesso', () => {
    requisitarLogin({
      email: obterEnv('USER'),
      senha: obterEnv('PASSWORD'),
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.headers['content-type']).to.include('application/json')
      expect(response.body).to.have.property('id').and.be.a('number')
      expect(response.body).to.have.property('nome').and.be.a('string')
      expect(response.body).to.have.property('token').and.match(/^[\w-]+\.[\w-]+\.[\w-]+$/)
    })
  })

  it('retorna erro ao informar senha invalida', () => {
    requisitarLogin({
      email: obterEnv('USER'),
      senha: 'senha-invalida',
    }).then((response) => {
      expect(response.status).to.eq(401)
      validarTokenAusente(response.body)
    })
  })

  it('retorna erro ao informar usuario inexistente', () => {
    requisitarLogin({
      email: `usuario_inexistente_${Date.now()}@teste.com`,
      senha: obterEnv('PASSWORD'),
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.have.property('error', 'Problemas com o login do usuário')
    })
  })

  it('retorna erro quando email nao for enviado', () => {
    requisitarLogin({
      senha: obterEnv('PASSWORD'),
    }).then((response) => {
      expect(response.status).to.eq(500)
      expect(response.body).to.have.property('error', 'Problemas com o login do usuário')
    })
  })

  it('retorna erro quando senha nao for enviada', () => {
    requisitarLogin({
      email: obterEnv('USER'),
    }).then((response) => {
      expect(response.status).to.eq(401)
      validarTokenAusente(response.body)
    })
  })
})
