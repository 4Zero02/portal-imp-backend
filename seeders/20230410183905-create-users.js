'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'Fulano de Tal Man',
        cpf: '25251110367',
        birthdate: '2000-01-01', // Formato americano yyyy/mm/dd
        registration: '20200300001',
        contact: '(68) 99999-9999',
        course: 'Sistema de Informacao',
        university: 'UFAC',
        
        password: bcrypt.hashSync('25251110367', 10), // criptografa a senha
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Funala de Tal Women',
        cpf: '52583072390',
        birthdate: '2000-02-01', // Formato americano yyyy/mm/dd
        registration: '20200300002',
        contact: '(68) 88888-8888',
        course: 'Sistema de Informacao',
        university: 'UFAC',
        password: bcrypt.hashSync('52583072390', 10), // criptografa a senha
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ademir da Silva',
        cpf: '62277318620',
        birthdate: '1998-08-26', // Formato americano yyyy/mm/dd
        registration: '20170300001',
        contact: '(68) 98989-6969',
        course: 'Sistema de Informacao',
        university: 'UFAC',
        password: bcrypt.hashSync('62277318620', 10), // criptografa a senha
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  }
};