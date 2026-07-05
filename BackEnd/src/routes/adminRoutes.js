const express = require('express');
const router = express.Router();
const { getAllStudentsPerformance } = require('../controllers/adminController');

// 1. Import your actual middleware names: 'protect' and 'authorize'
const { protect, authorize } = require('../middleware/authMiddleware'); 

// 2. Use authorize('admin') to protect the route!
router.get('/performance', protect, authorize('admin'), getAllStudentsPerformance);

module.exports = router;