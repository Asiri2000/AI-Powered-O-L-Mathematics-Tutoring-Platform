const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const AnswerOption = sequelize.define(
  "AnswerOption",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lesson_step_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    option_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "answer_options",
    timestamps: false,
  }
);

module.exports = AnswerOption;
