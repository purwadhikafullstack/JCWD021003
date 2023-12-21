'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('resetTokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      token: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: 'users',
          },
          key: 'id'
        },
        allowNull: false,
      },
      isUsed: {
        type: Sequelize.BOOLEAN,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('resetTokens');
  }
};
