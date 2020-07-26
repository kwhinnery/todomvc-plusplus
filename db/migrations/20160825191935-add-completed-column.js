'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn(
      'Todos', // name of table
      'completed', // name of attribute
      Sequelize.BOOLEAN
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn(
      'Todos', // name of table
      'completed' //name of column
    );
  }
};
