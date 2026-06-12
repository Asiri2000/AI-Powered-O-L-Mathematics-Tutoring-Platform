const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutorController');

// Route to get all tutors
router.get('/', tutorController.getAllTutors);

// Route to get a specific tutor by ID
router.get('/:id', tutorController.getTutorById);

// Route to create a new tutor
router.post('/', tutorController.createTutor);

// Route to update an existing tutor
router.put('/:id', tutorController.updateTutor);

// Route to delete a tutor
router.delete('/:id', tutorController.deleteTutor);

module.exports = router;