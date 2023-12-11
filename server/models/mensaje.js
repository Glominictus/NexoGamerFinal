// models/mensaje.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');


const Usuario = require('./usuario');

const Mensaje = sequelize.define('Mensaje', {
  id_mensaje: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_remitente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id_usuario'
    }
  },
  id_destinatario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id_usuario'
    }
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fecha_mensaje: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'mensajes',
  timestamps: false
});

// Establecer la relación con el modelo Usuario
// Un mensaje pertenece a un remitente
Mensaje.belongsTo(Usuario, { as: 'Remitente', foreignKey: 'id_remitente' });
// Un mensaje pertenece a un destinatario
Mensaje.belongsTo(Usuario, { as: 'Destinatario', foreignKey: 'id_destinatario' });

module.exports = Mensaje;
