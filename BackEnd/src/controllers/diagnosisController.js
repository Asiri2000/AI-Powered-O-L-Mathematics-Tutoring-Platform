const { sequelize } = require('../config/database');

exports.getErrorBreakdown = async (req, res) => {
  try {
    const userId = req.user.id;

    const [results] = await sequelize.query(
      `
      SELECT 
        chapter,
        error_type,
        COUNT(*) AS occurrences
      FROM quiz_attempts
      WHERE user_id = :userId
        AND error_type IS NOT NULL
      GROUP BY chapter, error_type
      ORDER BY chapter, occurrences DESC
      `,
      { replacements: { userId } }
    );

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Diagnosis error', error: error.message });
  }
};

exports.getWeakChapters = async (req, res) => {
  try {
    const userId = req.user.id;

    const [results] = await sequelize.query(
      `
      SELECT
        chapter,
        COUNT(*) AS total_attempts,
        SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) AS correct_answers,
        ROUND(
          (SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)::decimal / COUNT(*)) * 100,
          2
        ) AS accuracy_percentage
      FROM quiz_attempts
      WHERE user_id = :userId
      GROUP BY chapter
      ORDER BY accuracy_percentage ASC
      `,
      { replacements: { userId } }
    );

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Diagnosis error', error: error.message });
  }
};
