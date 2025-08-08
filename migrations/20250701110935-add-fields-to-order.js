'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('orders');
    
    if (!table.shippingType) {
      await queryInterface.addColumn('orders', 'shippingType', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!table.shippingCost) {
      await queryInterface.addColumn('orders', 'shippingCost', {
        type: Sequelize.FLOAT,
        allowNull: true
      });
    }
    
  },

  down: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('orders');
    
    if (table.shippingType) {
      await queryInterface.removeColumn('orders', 'shippingType');
    }
    
    if (table.shippingCost) {
      await queryInterface.removeColumn('orders', 'shippingCost');
    }
  }
};
