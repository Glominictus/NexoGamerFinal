// models/transaccion.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Usuario = require('./usuario');
const Articulo = require('./articulo');

const Transaccion = sequelize.define('Transaccion', {
  id_transaccion: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_comprador: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id_usuario'
    }
  },
  id_vendedor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id_usuario'
    }
  },
  id_articulo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Articulo,
      key: 'id_articulo'
    }
  },
  fecha_transaccion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  tipo_transaccion: {
    type: DataTypes.ENUM('venta', 'intercambio'),
    allowNull: false
  }
}, {
  tableName: 'transacciones',
  timestamps: false
});

// Relaciones
Transaccion.belongsTo(Usuario, { as: 'Comprador', foreignKey: 'id_comprador' });
Transaccion.belongsTo(Usuario, { as: 'Vendedor', foreignKey: 'id_vendedor' });
Transaccion.belongsTo(Articulo, { foreignKey: 'id_articulo' });

module.exports = Transaccion;
