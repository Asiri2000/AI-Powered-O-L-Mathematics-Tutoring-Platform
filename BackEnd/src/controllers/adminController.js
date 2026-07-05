const { sequelize } = require("../config/database");

/**
 * =================================================
 * 📊 GET ALL STUDENTS PERFORMANCE (ADMIN)
 * =================================================
 */
exports.getAllStudentsPerformance = async (req, res) => {
  try {
    // We replaced the LEFT JOIN with Subqueries. 
    // This perfectly mimics your working dashboard query for every single user!
    const [studentsData] = await sequelize.query(`
      SELECT 
        u.id, 
        u.username, 
        u.email,
        u.school,
        -- Subquery 1: Get Total Attempts
        (
          SELECT COUNT(*)::int 
          FROM quiz_attempts qa 
          WHERE TRIM(qa.user_id::text) = TRIM(u.id::text)
        ) AS total_attempts,
        
        -- Subquery 2: Get Accuracy Percentage
        (
          SELECT COALESCE(
            ROUND(
              (SUM(CASE WHEN qa.is_correct THEN 1 ELSE 0 END)::decimal 
              / NULLIF(COUNT(*), 0)) * 100, 
              2
            ), 
            0
          )
          FROM quiz_attempts qa 
          WHERE TRIM(qa.user_id::text) = TRIM(u.id::text)
        ) AS accuracy_percentage

      FROM users u
      WHERE u.role = 'student'
      GROUP BY u.id, u.username, u.email, u.school
      ORDER BY accuracy_percentage DESC;
    `);

    return res.status(200).json(studentsData);

  } catch (error) {
    console.error("❌ ADMIN PERFORMANCE ERROR:", error);
    return res.status(500).json({ 
      message: "Failed to fetch student performance data" 
    });
  }
};