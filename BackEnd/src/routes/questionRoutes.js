const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

// Create a new question
router.post("/", questionController.createQuestion);

// Get all questions
router.get("/", questionController.getAllQuestions);

// Get question by ID
router.get("/:id", questionController.getQuestionById);

// Update question
router.put("/:id", questionController.updateQuestion);

// Delete question
router.delete("/:id", questionController.deleteQuestion);

module.exports = router;
