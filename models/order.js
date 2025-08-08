'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(sequelize.models.User, { foreignKey: 'userId' });
      Order.belongsTo(sequelize.models.Status, { foreignKey: 'statusId' });
    }
  };
  Order.init({
    orderDate: DataTypes.DATE,
    deliveryAddress: DataTypes.STRING,
    totalPrice: DataTypes.FLOAT,
    discount: DataTypes.FLOAT,
    finalPrice: DataTypes.FLOAT,
    statusId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    shippingType: DataTypes.STRING,
    shippingCost: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};