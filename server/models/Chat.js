const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Chat = sequelize.define('Chat', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  conteudo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  data: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,//Concerta a data, pois salva na fuso zero
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'usuarios',  // Nome da tabela de referência
      key: 'id',
    },
  },
  sala_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'salas',  // Nome da tabela de referência
      key: 'id',
    },
  },
}, {
  tableName: 'chat',
  timestamps: false,
});

module.exports = Chat;
