const Question = require('../models/Question');

/**
 * Create a new question
 */
exports.createQuestion = async (req, res) => {
  try {
    const questionData = req.body;

    const newQuestion = await Question.create(questionData); // ✅ Sequelize

    res.status(201).json(newQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error creating question',
      error: error.message
    });
  }
};

/**
 * Get all questions
 */
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll(); // ✅ Sequelize

    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error retrieving questions',
      error: error.message
    });
  }
};

/**
 * Get a question by ID
 */
exports.getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findByPk(id); // ✅ Sequelize

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error retrieving question',
      error: error.message
    });
  }
};

/**
 * Update a question
 */
exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findByPk(id); // ✅ Sequelize

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    await question.update(req.body); // ✅ Sequelize instance update

    res.status(200).json({
      message: 'Question updated successfully',
      question
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error updating question',
      error: error.message
    });
  }
};

/**
 * Delete a question
 */
exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findByPk(id); // ✅ Sequelize

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    await question.destroy(); // ✅ Sequelize

    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error deleting question',
      error: error.message
    });
  }
};
