// models/articulo.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Usuario = require('./usuario');
const Categoria = require('./categoria');
const Genero = require('./genero');
const Plataforma = require('./plataforma');

const Articulo = sequelize.define('Articulo', {
  id_articulo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  interes: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  fecha_publicacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categoria',
      key: 'id_categoria'
    }
  },
  imagenes: {
    type: DataTypes.TEXT, 
    allowNull: true
  },
  tipo: {
    type: DataTypes.ENUM('Venta', 'Intercambio'),
    allowNull: true
  },
  id_genero: {
    type: DataTypes.INTEGER,
    allowNull: true, //
    references: {
        model: 'Genero', 
        key: 'id_genero'
    }
},
  id_plataforma: {
    type: DataTypes.INTEGER,
    allowNull: true, //
    references: {
        model: 'Plataforma',
        key: 'id_plataforma'
    }
 
},
id_usuario:{
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
      model: 'Usuario', 
      key: 'id_usuario'
  }}

},
 {
  tableName: 'articulos',
  timestamps: false 
});

// Establece la relación Uno a Muchos con Categoria
Categoria.hasMany(Articulo, { foreignKey: 'id_categoria' });
Articulo.belongsTo(Categoria, { foreignKey: 'id_categoria' });

// Establece la relación Uno a Muchos con Usuario
Usuario.hasMany(Articulo, { foreignKey: 'id_usuario' });
Articulo.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Genero.hasMany(Articulo, { foreignKey: 'id_genero' });
Articulo.belongsTo(Genero, { foreignKey: 'id_genero' });

Plataforma.hasMany(Articulo, { foreignKey: 'id_plataforma' });
Articulo.belongsTo(Plataforma, { foreignKey: 'id_plataforma' });

module.exports = Articulo;
