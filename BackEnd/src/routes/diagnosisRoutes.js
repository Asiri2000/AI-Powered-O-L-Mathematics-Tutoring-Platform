const express = require('express');
const router = express.Router();
const diagnosisController = require('../controllers/diagnosisController');
const { protect } = require('../middleware/authMiddleware');

router.get('/errors', protect, diagnosisController.getErrorBreakdown);
router.get('/weaknesses', protect, diagnosisController.getWeakChapters);

module.exports = router;
