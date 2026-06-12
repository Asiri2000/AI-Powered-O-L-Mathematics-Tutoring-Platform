const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const QuizAttempt = sequelize.define("QuizAttempt", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  question_id: {                // ✅ ADD
    type: DataTypes.UUID,
    allowNull: false
  },
  chapter: {
    type: DataTypes.STRING,
    allowNull: false
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  selected_answer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correct_answer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  is_correct: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  time_taken: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "quiz_attempts",
  timestamps: true
});

module.exports = QuizAttempt;
