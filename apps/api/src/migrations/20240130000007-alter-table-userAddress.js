'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('userAddresses', 'postalCode',{
      type: Sequelize.INTEGER
    });

    await queryInterface.addColumn(
      'UserAddresses', 'latitude',
      {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: true
      }
    );

    await queryInterface.addColumn(
      'UserAddresses','longitude',
      {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: true
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('userAddresses', 'postalCode');
    await queryInterface.removeColumn('UserAddresses', 'latitude');
    await queryInterface.removeColumn('UserAddresses', 'longitude');
  }
};
