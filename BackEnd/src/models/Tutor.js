const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Tutor = sequelize.define(
  'Tutor',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    qualification: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    experienceYears: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    hourlyRate: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    tableName: 'tutors',
    timestamps: true,
  }
);

module.exports = Tutor;
