// models/juego.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Articulo = require('./articulo');
const Plataforma = require('./plataforma');
const Genero = require('./genero');

const Juego = sequelize.define('Juego', {
  id_juego: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_articulo: {
    type: DataTypes.INTEGER,
    references: {
      model: Articulo,
      key: 'id_articulo'
    }
  },
  id_plataforma: {
    type: DataTypes.INTEGER,
    references: {
      model: Plataforma,
      key: 'id_plataforma'
    }
  },
  id_genero: {
    type: DataTypes.INTEGER,
    references: {
      model: Genero,
      key: 'id_genero'
    }
  }
}, {
  tableName: 'juegos',
  timestamps: false
});

// Establecer relaciones
Juego.belongsTo(Articulo, { foreignKey: 'id_articulo' });
Articulo.hasMany(Juego, { foreignKey: 'id_articulo' });

Juego.belongsTo(Plataforma, { foreignKey: 'id_plataforma' });
Plataforma.hasMany(Juego, { foreignKey: 'id_plataforma' });

Juego.belongsTo(Genero, { foreignKey: 'id_genero' });
Genero.hasMany(Juego, { foreignKey: 'id_genero' });

module.exports = Juego;