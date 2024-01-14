'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
      },
      userAddressId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          model: {
            tableName: 'userAddresses',
          },
          key: 'id',
        },
      },
      warehouseId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          model: {
            tableName: 'warehouses',
          },
          key: 'id',
        },
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,0),
      },
      totalQuantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          min: 0,
        },
      },
      shippingCost: {
        type: Sequelize.DECIMAL(10,0),
      },
      orderDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      orderStatusId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          model: {
            tableName: 'orderStatuses',
          },
          key: 'id',
        },
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};
