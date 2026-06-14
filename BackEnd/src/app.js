const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');
const tutorRoutes = require('./routes/tutorRoutes');
<<<<<<< Updated upstream
=======
const quizRoutes = require('./routes/quizRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const diagnosisRoutes = require('./routes/diagnosisRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const mockExamRoutes = require('./routes/mockExamRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const chatRoutes = require('./routes/chatRoutes');

// Error handler
const errorHandler = require('./middleware/errorHandler');
>>>>>>> Stashed changes

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/tutors', tutorRoutes);
<<<<<<< Updated upstream
=======
app.use('/api/quiz', quizRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/diagnosis', diagnosisRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/mock-exam', mockExamRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/chat', chatRoutes);
>>>>>>> Stashed changes

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

module.exports = app;