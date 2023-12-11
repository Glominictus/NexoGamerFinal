// models/consola.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Consola = sequelize.define('Consola', {
  id_consola: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },

}, {
  tableName: 'consolas',
  timestamps: false
});

module.exports = Consola;