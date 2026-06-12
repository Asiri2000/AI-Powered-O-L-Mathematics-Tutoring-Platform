require('dotenv').config();
const app = require('./app');
const { sequelize, connectDB } = require('./config/database');
const { PORT } = require('./config/environment');

/**
 * =========================
 * 🔐 GLOBAL PROCESS SAFETY
 * =========================
 */

// Catch unhandled promise rejections
process.on('unhandledRejection', (reason) => {
  console.error('🔥 Unhandled Rejection:', reason);
});

// Catch uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('🔥 Uncaught Exception:', error);
  process.exit(1);
});

/**
 * =========================
 * 🚀 SERVER START
 * =========================
 */
const startServer = async () => {
  try {
    // Connect to PostgreSQL
    await connectDB();

    // Sync models (DEV ONLY)
    if (process.env.NODE_ENV === 'development') {
      console.log('🛠 Syncing database...');
      await sequelize.sync({ alter: true });
      console.log('✅ Database synced');
    }

    // Start Express server
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Server failed to start:', error);
    process.exit(1);
  }
};

startServer();
