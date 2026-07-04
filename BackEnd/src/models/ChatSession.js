const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * Unified chat session — supports both logged-in users and guests.
 *
 * - ownerType = 'user'  → ownerId is a User.id (UUID)
 * - ownerType = 'guest' → ownerId is a guest token (UUID v4 string)
 *
 * This single-table polymorphic design avoids duplicating message storage
 * and enables future guest→user migration by simply updating ownerType/ownerId.
 */
const ChatSession = sequelize.define('ChatSession', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  ownerType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isIn: [['user', 'guest']] },
  },
  ownerId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(120),
    allowNull: false,
    defaultValue: 'New Chat',
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'en',
    validate: { isIn: [['en', 'si']] },
  },
}, {
  tableName: 'chat_sessions',
  timestamps: true,
  indexes: [
    { fields: ['ownerType', 'ownerId'] },
    { fields: ['updatedAt'] },
  ],
});

module.exports = ChatSession;
