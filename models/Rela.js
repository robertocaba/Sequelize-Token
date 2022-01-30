'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rela extends Model {
    
    static associate(models) {
      
    }
  }
  Rela.init({
    UserId: DataTypes.INTEGER,
    ProductoId: DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'Rela',
  });
  return Rela;
};