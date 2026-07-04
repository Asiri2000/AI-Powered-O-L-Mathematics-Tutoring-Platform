const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * Individual message within a chat session.
 * Each message belongs to exactly one ChatSession.
 */
const ChatMessage = sequelize.define('ChatMessage', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  sessionId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'chat_sessions',
      key: 'id',
    },
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isIn: [['user', 'bot']] },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  source: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'model',
    validate: { isIn: [['model', 'deterministic']] },
  },
}, {
  tableName: 'chat_messages',
  timestamps: true,
  indexes: [
    { fields: ['sessionId'] },
    { fields: ['sessionId', 'createdAt'] },
  ],
});

module.exports = ChatMessage;
