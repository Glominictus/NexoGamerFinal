// models/merchandising.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Articulo = require('./articulo');
const TipoMerchandising = require('./tipoMerchandising');

const Merchandising = sequelize.define('Merchandising', {
  id_merchandising: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_articulo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Articulo,
      key: 'id_articulo'
    }
  },
  id_tipo_merchandising: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TipoMerchandising,
      key: 'id_tipo_merchandasing'
    }
  }
}, {
  tableName: 'merchandising',
  timestamps: false
});

// Relaciones
Merchandising.belongsTo(Articulo, { foreignKey: 'id_articulo' });
Articulo.hasMany(Merchandising, { foreignKey: 'id_articulo' });

Merchandising.belongsTo(TipoMerchandising, { foreignKey: 'id_tipo_merchandising' });
TipoMerchandising.hasMany(Merchandising, { foreignKey: 'id_tipo_merchandising' });

module.exports = Merchandising;