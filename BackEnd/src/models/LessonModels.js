const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database"); // Adjust path if needed

// 1. Lesson Model
const Lesson = sequelize.define(
  "Lesson",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    theme_slug: { type: DataTypes.STRING(50), allowNull: false },
  },
  {
    tableName: "lessons",
    timestamps: false, // Added because your Python models didn't have created_at/updated_at
  },
);

// 2. LessonStep Model
const LessonStep = sequelize.define(
  "LessonStep",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    lesson_id: { type: DataTypes.INTEGER, allowNull: false },
    order_index: { type: DataTypes.INTEGER, allowNull: false },
    theory_text: { type: DataTypes.TEXT, allowNull: true },
    theory_media_url: { type: DataTypes.STRING(500), allowNull: true },
    question_text: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    tableName: "lesson_steps",
    timestamps: false,
  },
);

// 3. AnswerOption Model
const AnswerOption = sequelize.define(
  "AnswerOption",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    lesson_step_id: { type: DataTypes.INTEGER, allowNull: false },
    option_text: { type: DataTypes.STRING(255), allowNull: false },
    is_correct: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: "answer_options",
    timestamps: false,
  },
);

// --- RELATIONSHIPS (Crucial for the nested JSON) ---
Lesson.hasMany(LessonStep, { foreignKey: "lesson_id", as: "steps" });
LessonStep.belongsTo(Lesson, { foreignKey: "lesson_id", as: "lesson" });

LessonStep.hasMany(AnswerOption, {
  foreignKey: "lesson_step_id",
  as: "options",
  onDelete: "CASCADE",
});
AnswerOption.belongsTo(LessonStep, {
  foreignKey: "lesson_step_id",
  as: "step",
});

module.exports = { Lesson, LessonStep, AnswerOption };
