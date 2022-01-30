'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
   
    static associate(models) {
      Producto.belongsToMany(models.User, { through:models.Rela, onDelete:'cascade'})
      
    }
  }
  Producto.init({
    nombre: DataTypes.STRING,
    price: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Producto',
  });
  return Producto;
};