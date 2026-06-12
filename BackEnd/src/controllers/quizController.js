const QuizAttempt = require("../models/QuizAttempt");
const ChapterMastery = require("../models/ChapterMastery");

/**
 * POST /api/quiz/submit
 * Save quiz attempt + update mastery analytics
 */
exports.submitQuiz = async (req, res, next) => {
  try {
    const user_id = req.user.id;

    const {
      question_id,
      chapter,
      question,
      selected_answer,
      correct_answer,
      time_taken,
    } = req.body;

    /* =========================
       🛡 VALIDATION
    ========================= */
    if (
      !question_id ||
      !chapter ||
      !question ||
      !selected_answer ||
      !correct_answer ||
      typeof time_taken !== "number"
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing or invalid required fields",
      });
    }

    const is_correct = selected_answer === correct_answer;

    /* =========================
       1️⃣ SAVE QUIZ ATTEMPT
    ========================= */
    await QuizAttempt.create({
      user_id,
      question_id,
      chapter,
      question,
      selected_answer,
      correct_answer,
      is_correct,
      time_taken,
    });

    /* =========================
       2️⃣ RECALCULATE STATS
    ========================= */
    const attempts = await QuizAttempt.findAll({
      where: { user_id, chapter },
    });

    const total_attempts = attempts.length;

    const correctCount = attempts.filter(
      (a) => a.is_correct === true
    ).length;

    const totalTime = attempts.reduce(
      (sum, a) => sum + (a.time_taken || 0),
      0
    );

    const accuracy =
      total_attempts > 0
        ? Number((correctCount / total_attempts).toFixed(2))
        : 0;

    const avg_time =
      total_attempts > 0
        ? Math.round(totalTime / total_attempts)
        : 0;

    /* =========================
       3️⃣ MASTERY + DIFFICULTY
    ========================= */
    let mastery_level = "BEGINNER";
    let difficulty_level = 2;

    if (accuracy >= 0.8) {
      mastery_level = "EXAM_READY";
      difficulty_level = 5;
    } else if (accuracy >= 0.65) {
      mastery_level = "PROFICIENT";
      difficulty_level = 4;
    } else if (accuracy >= 0.5) {
      mastery_level = "PRACTICING";
      difficulty_level = 3;
    }

    /* =========================
       4️⃣ UPSERT CHAPTER MASTERY
    ========================= */
    await ChapterMastery.upsert({
      user_id,
      chapter,
      mastery_level,
      accuracy,
      avg_time,
      difficulty_level,
      total_attempts,
    });

    /* =========================
       ✅ RESPONSE
    ========================= */
    res.status(201).json({
      success: true,
      is_correct,
      accuracy,
      avg_time,
      mastery_level,
      difficulty_level,
      total_attempts,
    });

  } catch (error) {
    console.error("🔥 Quiz submit failed:", error);
    next(error);
  }
};
