'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Titles', [
      {
        name: 'Gamer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jogador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Festeiro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('titles', null, {});
  }
};

