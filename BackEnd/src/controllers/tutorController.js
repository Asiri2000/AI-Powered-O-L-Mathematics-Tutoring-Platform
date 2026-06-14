const Tutor = require('../models/Tutor');

// Fetch all tutors
exports.getAllTutors = async (req, res) => {
  try {
    const tutors = await Tutor.findAll();
    res.status(200).json(tutors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tutors', error: error.message });
  }
};

// Fetch a single tutor by ID
exports.getTutorById = async (req, res) => {
  try {
    const tutor = await Tutor.findByPk(req.params.id);
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }
    res.status(200).json(tutor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tutor', error: error.message });
  }
};

// Create a new tutor
exports.createTutor = async (req, res) => {
  try {
    const tutor = await Tutor.create(req.body);
    res.status(201).json(tutor);
  } catch (error) {
    res.status(400).json({ message: 'Error creating tutor', error: error.message });
  }
};

// Update a tutor
exports.updateTutor = async (req, res) => {
  try {
    const tutor = await Tutor.findByPk(req.params.id);
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }

    await tutor.update(req.body);
    res.status(200).json(tutor);
  } catch (error) {
    res.status(400).json({ message: 'Error updating tutor', error: error.message });
  }
};

// Delete a tutor
exports.deleteTutor = async (req, res) => {
  try {
    const tutor = await Tutor.findByPk(req.params.id);
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }

    await tutor.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tutor', error: error.message });
  }
};
