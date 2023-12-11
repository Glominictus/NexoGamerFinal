// models/usuario.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Usuario = sequelize.define(
  "Usuario",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha_registro: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    foto_perfil_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    pais: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ciudad: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    codigo_postal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    idioma: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    valoracion_promedio: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: true,
    },
    num_valoraciones: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cuenta_verificada: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    ultimo_acceso: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    rol: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user',
      allowNull: false
    },
  },
  {
    tableName: "usuario",
    timestamps: false,
  }
);

module.exports = Usuario;