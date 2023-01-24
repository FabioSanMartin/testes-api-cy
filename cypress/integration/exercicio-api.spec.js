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

     });

     it('Deve cadastrar um usuário com sucesso', () => {

          let nomeFaker = faker.internet.userName()
          let emailFaker = faker.internet.email()
          let passwordFaker = faker.internet.password()
          cy.cadastrarUsuario(nomeFaker, emailFaker, passwordFaker)

     });

     it('Deve validar um usuário com email inválido', () => {
         cy.emailInvalido('Paolo', 'motorola@qa.com', 'ssd@tst')

     });

     it('Deve editar um usuário previamente cadastrado', () => {
     cy.editarUsuarios('Luiz', 'motorola@qaaaa.com', 'fortrek')


     });

     it('Deve deletar um usuário previamente cadastrado', () => {
      cy.deletarUsuarios()
     });


});
