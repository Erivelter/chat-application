const { DataTypes } = require('sequelize');
const sequelize = require('../db');  // A conexão com o banco

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  senha_hash: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'usuarios',  // Nome da tabela no banco de dados
  timestamps: false,      // Não usar os campos createdAt / updatedAt
});

module.exports = Usuario;
