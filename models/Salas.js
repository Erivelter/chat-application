const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Sala = sequelize.define('Sala', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'salas',
  timestamps: false,
});

module.exports = Sala;
