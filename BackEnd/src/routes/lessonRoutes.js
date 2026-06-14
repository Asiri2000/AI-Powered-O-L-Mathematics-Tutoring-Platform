const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonController");

// Get all lessons
router.get("/", lessonController.getAllLessons);

// Get lesson content (steps + answer options)
router.get("/:id/content", lessonController.getLessonContent);

// Add a step to a lesson
router.post("/add-step", lessonController.addStep);

module.exports = router;
