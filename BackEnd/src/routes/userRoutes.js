const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/profile', protect, userController.getProfile);
router.put('/profile', protect, userController.updateProfile);
router.delete('/:id', protect, authorize('admin'), userController.deleteUser);
router.get('/', protect, authorize('admin'), userController.getAllUsers);
router.put('/:id/role', protect, authorize('admin'), userController.updateUserRole);

module.exports = router;
