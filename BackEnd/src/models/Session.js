const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Session = sequelize.define('Session', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  subject: DataTypes.STRING,
  sessionDate: DataTypes.DATE,
  duration: DataTypes.INTEGER,
  notes: DataTypes.TEXT,
}, {
  tableName: 'sessions',
  timestamps: true,
});

module.exports = Session;
