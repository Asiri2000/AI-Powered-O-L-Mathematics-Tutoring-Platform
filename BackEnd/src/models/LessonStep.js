const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const LessonStep = sequelize.define(
  "LessonStep",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lesson_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_index: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    media_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    theory_text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    theory_media_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    question_text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "lesson_steps",
    timestamps: false,
  }
);

module.exports = LessonStep;
