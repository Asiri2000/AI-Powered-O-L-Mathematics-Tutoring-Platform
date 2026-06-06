const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

// Define the routes (Note: No 'protect' middleware added here to match your Python code, 
// but you can add it if these should be private!)
router.get('/', lessonController.getAllLessons);
router.get('/:lesson_id/content', lessonController.getLessonContent);
router.post('/add-step', lessonController.createLessonStep);

module.exports = router;