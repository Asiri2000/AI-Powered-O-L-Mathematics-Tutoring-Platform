const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const ChapterMastery = sequelize.define("ChapterMastery", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  chapter: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mastery_level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accuracy: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  avg_time: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  difficulty_level: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_attempts: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "chapter_mastery",
  timestamps: true,
});

module.exports = ChapterMastery;
