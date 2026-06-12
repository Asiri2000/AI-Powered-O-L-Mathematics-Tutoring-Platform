const User = require('../models/User');
const bcrypt = require('bcryptjs');

/**
 * =================================================
 * 👤 GET LOGGED-IN USER PROFILE
 * GET /api/users/profile
 * Private
 * =================================================
 */
exports.getProfile = async (req, res) => {
  res.status(200).json({
    id: req.user.id,
    studentName: req.user.studentName,
    username: req.user.username,
    email: req.user.email,
    grade: req.user.grade,
    school: req.user.school,
    role: req.user.role,
    createdAt: req.user.createdAt,
  });
};

/**
 * =================================================
 * ✏️ UPDATE LOGGED-IN USER PROFILE
 * PUT /api/users/profile
 * Private
 * =================================================
 */
exports.updateProfile = async (req, res, next) => {
  try {
    const updates = {};
    const allowedFields = [
      'studentName',
      'username',
      'email',
      'password',
      'grade',
      'school',
    ];

    // Pick only allowed fields
    allowedFields.forEach((field) => {
      if (req.body[field] && req.body[field].toString().trim() !== '') {
        updates[field] = req.body[field];
      }
    });

    // ❌ Prevent role changes
    if (req.body.role) {
      return res.status(403).json({
        message: 'Role cannot be changed here',
      });
    }

    // 🔐 Password update
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    // 🔎 Ensure unique email
    if (updates.email && updates.email !== req.user.email) {
      const emailExists = await User.findOne({ where: { email: updates.email } });
      if (emailExists) {
        return res.status(409).json({ message: 'Email already in use' });
      }
    }

    // 🔎 Ensure unique username
    if (updates.username && updates.username !== req.user.username) {
      const usernameExists = await User.findOne({
        where: { username: updates.username },
      });
      if (usernameExists) {
        return res.status(409).json({ message: 'Username already in use' });
      }
    }

    const updatedUser = await req.user.update(updates);

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        studentName: updatedUser.studentName,
        username: updatedUser.username,
        email: updatedUser.email,
        grade: updatedUser.grade,
        school: updatedUser.school,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * =================================================
 * 🛡 UPDATE USER ROLE (ADMIN ONLY)
 * PUT /api/users/:id/role
 * Admin
 * =================================================
 */
exports.updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    const validRoles = ['student', 'tutor', 'admin'];

    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role value' });
    }

    // ❌ Prevent admin demoting themselves
    if (req.user.id === req.params.id) {
      return res.status(400).json({
        message: 'Admin cannot change their own role',
      });
    }

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      message: 'User role updated successfully',
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * =================================================
 * 🗑 DELETE USER (ADMIN ONLY)
 * DELETE /api/users/:id
 * Admin
 * =================================================
 */
exports.deleteUser = async (req, res, next) => {
  try {
    if (req.user.id === req.params.id) {
      return res.status(400).json({
        message: 'Admin cannot delete their own account',
      });
    }

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * =================================================
 * 📋 GET ALL USERS (ADMIN ONLY)
 * GET /api/users
 * Admin
 * =================================================
 */
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
