const { sequelize } = require("../config/database");

/**
 * =================================================
 * 📊 GET LESSON PERFORMANCE (LOGGED USER)
 * GET /api/dashboard/performance?grade=10&lesson=Perimeter
 * Private
 * =================================================
 */
exports.getLessonPerformance = async (req, res) => {
  try {
    const userId = req.user.id;
    const { grade, lesson } = req.query;

    if (!grade || !lesson) {
      return res.status(400).json({
        message: "Grade and lesson are required",
      });
    }

    const [results] = await sequelize.query(
      `
      SELECT
        COUNT(*)::int AS total_attempts,
        COALESCE(
          ROUND(
            (SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)::decimal
            / NULLIF(COUNT(*), 0)) * 100,
            2
          ),
          0
        ) AS accuracy_percentage,
        ROUND(AVG(time_taken), 2) AS avg_time_seconds,
        MIN("createdAt") AS first_attempt,
        MAX("createdAt") AS latest_attempt
      FROM quiz_attempts
      WHERE user_id = :userId
        AND chapter = :lesson
      `,
      {
        replacements: { userId, lesson },
      }
    );

    return res.status(200).json({
      grade,
      lesson,
      total_attempts: results[0].total_attempts,
      accuracy_percentage: results[0].accuracy_percentage,
      avg_time_seconds: results[0].avg_time_seconds,
      first_attempt: results[0].first_attempt,
      latest_attempt: results[0].latest_attempt,
    });

  } catch (error) {
    console.error("❌ DASHBOARD PERFORMANCE ERROR:", error);
    return res.status(500).json({
      message: "Dashboard performance error",
    });
  }
};
