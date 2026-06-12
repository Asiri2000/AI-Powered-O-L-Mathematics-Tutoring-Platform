const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * =========================
 * 📝 REGISTER USER
 * =========================
 * @route POST /api/auth/register
 */
exports.register = async (req, res, next) => {
  try {
    const {
      studentName,
      username,
      email,
      password,
      grade,
      school,
    } = req.body;

    // 🔎 Validate required fields
    if (!studentName || !username || !email || !password) {
      return res.status(400).json({
        message: 'Required fields are missing',
      });
    }

    // 🔎 Check existing user
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        message: 'Email already registered',
      });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🧾 Create user
    const newUser = await User.create({
      studentName,
      username,
      email,
      password: hashedPassword,
      grade,
      school,
      role: 'student',
    });

    console.log('✅ USER CREATED:', newUser.id);

    return res.status(201).json({
      message: 'Account created successfully',
    });

  } catch (error) {
    console.error('❌ REGISTER ERROR:', error);
    next(error);
  }
};

/**
 * =========================
 * 🔑 LOGIN USER
 * =========================
 * @route POST /api/auth/login
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 🔎 Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      });
    }

    // 🔎 Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    // 🔐 Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    // 🔑 Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
      }
    );

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        studentName: user.studentName,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error('❌ LOGIN ERROR:', error);
    next(error);
  }
};
