'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here 
    }
  }
  users.init({
    name: {type: DataTypes.STRING(50),unique: true},
    age: DataTypes.INTEGER(100),
    birthDate: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'users',
  })
  users.associate = function (models) {
    users.hasMany(models.patient,{
      as:"patient",
      foreignKey:"userId"
    })
  }
  return users;
};