/// <reference types="cypress" />
import contrato from '../contracts/produtos.contract'
import { faker } from '@faker-js/faker'


describe('Testes da Funcionalidade Usuários', () => {

     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
               return contrato.validateAsync(response.body)
          })

     });

     it('Deve listar usuários cadastrados', () => {
          cy.listarUsuarios()
          .then((response) => {
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')
           })

     });

     it('Deve cadastrar um usuário com sucesso', () => {

          let nomeFaker = faker.internet.userName()
          let emailFaker = faker.internet.email()
          let passwordFaker = faker.internet.password()
          cy.cadastrarUsuario(nomeFaker, emailFaker, passwordFaker)
          .then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body).to.have.property('message')
                   .to.equal('Cadastro realizado com sucesso')
           })
     });

     it('Deve validar um usuário com email inválido', () => {
         cy.emailInvalido('Paolo', 'motorola@qa.com', 'ssd@tst')
         .then((response) => {
          expect(response.status).to.equal(400)
          expect(response.body).to.have.property('message')
              .to.equal('Este email já está sendo usado')
         })
         cy.emailloginInvalido('motorola@qa.br', 'ssd@tst')
         .then((response) => {
          expect(response.status).to.equal(401)
          expect(response.body).to.have.property('message')
              .to.equal('Email e/ou senha inválidos')
         })

     });

     it('Deve editar um usuário previamente cadastrado', () => {
     cy.editarUsuarios('Luiz', 'motorola@qaaaa.com', 'fortrek')
     .then((response) => {
          expect(response.status).to.equal(200)
          expect(response.body).to.have.property('message')
          .to.equal('Registro alterado com sucesso')
     })

     });

     it('Deve deletar um usuário previamente cadastrado', () => {
      cy.deletarUsuarios()
      .then((response) => {
          expect(response.status).to.equal(200)
          expect(response.body).to.have.property('message')
          .to.equal('Registro excluído com sucesso')
      })
     });


});
