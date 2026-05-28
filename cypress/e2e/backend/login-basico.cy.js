/// <reference types="cypress" />


describe('Login Backend Basico', () => {
    let tokenGerado

    it('Deve realizar login com sucesso', () => {

        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/signin',
            body: {
                "email": "senaiteste@gmail.com",
                "senha": "123456",
                "redirecionar": false
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('token')
            tokenGerado = response.body.token
            cy.log('Token recebido:', tokenGerado)
        })
    })

    it('Deve realizar login com credenciais inválidas', () => {

        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/signin',
            body: {
                "email": "senaiteste@gmail.com",
                "senha": "12345",
                "redirecionar": false
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401)
            expect(response.body || {}).to.not.have.property('token')
        })
    })
})
