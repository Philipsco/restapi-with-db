'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  patient.init({
    name: {type: DataTypes.STRING(50),unique: true},
    alamat: DataTypes.STRING,
    phone: DataTypes.STRING(12),
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'patient',
  });
  patient.associate = function (models) {
    patient.belongsTo(models.users,{
      as:"users",
      foreignKey:"userId"
    })
  }
  return patient;
};