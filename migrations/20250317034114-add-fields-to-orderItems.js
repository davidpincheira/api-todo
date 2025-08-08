'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Verifica primero si la columna existe para evitar errores
    const table = await queryInterface.describeTable('orderItems');
    
    if (!table.quantity) {
      await queryInterface.addColumn('orderItems', 'quantity', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      });
    }
    
    if (!table.productName) {
      await queryInterface.addColumn('orderItems', 'productName', {
        type: Sequelize.STRING,
        allowNull: true
      });
    }
    
    if (!table.totalPrice) {
      await queryInterface.addColumn('orderItems', 'totalPrice', {
        type: Sequelize.FLOAT,
        allowNull: true
      });
    }
  },

  async down(queryInterface, Sequelize) {
    // Es buena práctica verificar si las columnas existen antes de eliminarlas
    const table = await queryInterface.describeTable('orderItems');
    
    if (table.quantity) {
      await queryInterface.removeColumn('orderItems', 'quantity');
    }
    
    if (table.productName) {
      await queryInterface.removeColumn('orderItems', 'productName');
    }
    
    if (table.totalPrice) {
      await queryInterface.removeColumn('orderItems', 'totalPrice');
    }
  }
};