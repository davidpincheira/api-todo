'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      orderItem.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order'
      });
      
      // Si tienes un modelo Product
      orderItem.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product'
      });
    }
  };
  orderItem.init({
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'orderItem',
  });
  return orderItem;
};