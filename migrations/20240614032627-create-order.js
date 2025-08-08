'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderDate: {
        type: Sequelize.DATE
      },
      deliveryAddress: {
        type: Sequelize.STRING
      },
      totalPrice: {
        type: Sequelize.FLOAT
      },
      discount: {
        type: Sequelize.FLOAT
      },
      finalPrice: {
        type: Sequelize.FLOAT
      },
      statusId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};