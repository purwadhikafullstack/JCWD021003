'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Warehouses', 'userId');
    await queryInterface.removeColumn('Warehouses', 'address');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Warehouses', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('Warehouses', 'address', {
      type: Sequelize.STRING
    });
  }
};
