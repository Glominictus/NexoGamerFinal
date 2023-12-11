// models/plataforma.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Plataforma = sequelize.define('Plataforma', {
  id_plataforma: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'plataforma',
  timestamps: false
});

module.exports = Plataforma;