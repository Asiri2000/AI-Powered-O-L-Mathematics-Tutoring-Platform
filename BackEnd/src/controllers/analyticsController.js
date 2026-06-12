const { sequelize } = require('../config/database');

exports.getChapterAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    const results = await sequelize.query(
      `
      SELECT 
        chapter,
        COUNT(*) AS total_attempts,
        SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) AS correct_answers,
        ROUND(
          (SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)::decimal / COUNT(*)) * 100,
          2
        ) AS accuracy_percentage,
        ROUND(AVG(time_taken), 2) AS avg_time_seconds
      FROM quiz_attempts
      WHERE user_id = :userId
      GROUP BY chapter
      ORDER BY accuracy_percentage ASC
      `,
      {
        replacements: { userId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Analytics error', error: error.message });
  }
};

exports.getOverallSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const [result] = await sequelize.query(
      `
      SELECT
        COUNT(*) AS total_attempts,
        SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) AS correct_answers,
        ROUND(
          (SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)::decimal / COUNT(*)) * 100,
          2
        ) AS accuracy_percentage,
        ROUND(AVG(time_taken), 2) AS avg_time_seconds
      FROM quiz_attempts
      WHERE user_id = :userId
      `,
      {
        replacements: { userId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Analytics error', error: error.message });
  }
};
