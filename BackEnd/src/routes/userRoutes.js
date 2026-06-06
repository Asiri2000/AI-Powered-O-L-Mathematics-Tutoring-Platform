const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, isAdmin } = require('../middleware/authMiddleware');
router.get('/', protect, isAdmin, userController.getAllUsers);
router.get('/profile', protect, userController.getProfile);
router.put('/profile', protect, userController.updateProfile);
router.delete('/:id', protect, userController.deleteUser);
router.put('/:id/role', protect, isAdmin, userController.updateUserRole); // <-- NEW!
module.exports = router;
