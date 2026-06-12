const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/chapters', protect, analyticsController.getChapterAnalytics);
router.get('/summary', protect, analyticsController.getOverallSummary);

module.exports = router;
