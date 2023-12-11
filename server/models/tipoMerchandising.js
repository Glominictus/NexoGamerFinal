// models/tipoMerchandising.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const TipoMerchandising = sequelize.define('TipoMerchandising', {
  id_tipo_merchandasing: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'tipo_merchandasing',
  timestamps: false
});

module.exports = TipoMerchandising;