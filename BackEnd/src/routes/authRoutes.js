const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {
  validateUserRegistration,
  validateUserLogin,
  validateRequest,
} = require('../middleware/validation');

router.post(
  '/register',
  validateUserRegistration,
  validateRequest,
  authController.register
);

router.post(
  '/login',
  validateUserLogin,
  validateRequest,
  authController.login
);

module.exports = router;
