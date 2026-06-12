const express = require("express");
const axios = require("axios");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const quizController = require("../controllers/quizController");

// 🔹 Generate quiz (AI service)
router.post("/generate", async (req, res) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:6000/generate-quiz",
      req.body,
      { timeout: 25000 }
    );
    return res.json(response.data);
  } catch (error) {
    return res.status(503).json({ error: "Question service unavailable" });
  }
});

// 🔹 Submit quiz attempt (JWT REQUIRED)
router.post("/submit", protect, quizController.submitQuiz);

module.exports = router;
