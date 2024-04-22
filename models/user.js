'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    getFullname() {
      return [this.name, this.lastname].join(' ');
    }
    
    static associate(models) {
      // define association here      
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email:  {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your email address',
      },
      unique: {
        args: true,
        msg: 'Email already exists',
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your password',
      },
      validate: {
        len: {
          args: [6,255],//hacer validacion del password porque siempre guarda el hash
          msg: "Password must be at least 6 characters"
        }
      }
    },
    phone: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    type: DataTypes.ENUM('admin', 'customer'),
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};