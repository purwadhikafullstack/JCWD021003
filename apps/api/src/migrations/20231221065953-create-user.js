'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        validate: {
          is: /^[0-9a-f]{64}$/i
        },
      },
      roleId: {
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: 'roles',
          },
          key: 'id'
        },
        allowNull: false,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
      },
      avatar: {
        type: Sequelize.STRING,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
