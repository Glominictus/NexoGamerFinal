// models/categoria.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Categoria = sequelize.define('Categoria', {
  id_categoria: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'categorias',
  timestamps: false
});

module.exports = Categoria;
