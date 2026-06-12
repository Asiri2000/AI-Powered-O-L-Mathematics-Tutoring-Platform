const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// Route imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');
const tutorRoutes = require('./routes/tutorRoutes');
const quizRoutes = require('./routes/quizRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const diagnosisRoutes = require('./routes/diagnosisRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const mockExamRoutes = require('./routes/mockExamRoutes');
const lessonRoutes = require('./routes/lessonRoutes');

// Error handler
const errorHandler = require('./middleware/errorHandler');

const app = express();

/**
 * =========================
 * 🔧 GLOBAL MIDDLEWARE
 * =========================
 */

// Enable CORS
app.use(cors({ origin: true }));

// Parse JSON body
app.use(bodyParser.json({ limit: '1mb' }));

// HTTP request logging
app.use(morgan('dev'));

/**
 * =========================
 * 🚏 API ROUTES
 * =========================
 */

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/diagnosis', diagnosisRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/mock-exam', mockExamRoutes);
app.use('/api/lessons', lessonRoutes);

/**
 * =========================
 * ❌ 404 HANDLER
 * =========================
 */
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
  });
});

/**
 * =========================
 * 🔐 CENTRAL ERROR HANDLER
 * =========================
 * Catches all thrown errors
 * Prevents app crashes
 */
app.use(errorHandler);

module.exports = app;
