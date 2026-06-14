const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Lesson = sequelize.define(
  "Lesson",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    theme_slug: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "lessons",
    timestamps: false,
  }
);

module.exports = Lesson;
