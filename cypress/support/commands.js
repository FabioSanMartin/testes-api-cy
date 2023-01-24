// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('token', (email, senha) => {
    cy.request({
        method: 'POST',
        url: 'login',
        body: {
            "email": email,
            "password": senha
        }
    }).then((response) => {
        expect(response.status).to.equal(200)
        return response.body.authorization
    })
})

Cypress.Commands.add('cadastrarUsuario', (nomeFaker, emailFaker, passwordFaker,) => {
    cy.request({
        method: 'POST',
        url: 'usuarios',
        body: {
            "nome": nomeFaker,
            "email": emailFaker,
            "password": passwordFaker,
            "administrador": "true"
        }
    })
});

Cypress.Commands.add('listarUsuarios', () => {
    cy.request({
        method: 'GET',
        url: 'usuarios'
    })
})

Cypress.Commands.add('emailInvalido', (nome, email, password) => {
    cy.request({
        method: 'POST',
        url: 'usuarios',
        body: {
            "nome": nome,
            "email": email,
            "password": password,
            "administrador": "true"
        },
        failOnStatusCode: false
    })

})

Cypress.Commands.add('emailloginInvalido', (email, password) => {
    cy.request({
        method: 'POST',
        url: 'login',
        body: {
            "email": email,
            "password": password
        },
        failOnStatusCode: false
    })

})

Cypress.Commands.add('editarUsuarios', (nome, email, senha) => {
    cy.request('GET', 'usuarios').then((response) => {
        let id = response.body.usuarios[4]._id
        cy.request({
            method: 'PUT',
            url: `usuarios/${id}`,
            body: {
                "nome": nome,
                "email": email,
                "password": senha,
                "administrador": "true"
            }

        })

    })

})

Cypress.Commands.add('deletarUsuarios', () => {
    cy.request('GET', 'usuarios').then((response) => {
        let id = response.body.usuarios[0]._id
        cy.request({
            method: 'DELETE',
            url: `usuarios/${id}`,

        })

    })

})

