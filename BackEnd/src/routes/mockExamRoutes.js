const express = require("express");
const axios = require("axios");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

/**
 * POST /api/mock-exam/generate
 * Generates a 60-min mock exam with 5 essay questions
 */
router.post("/generate", protect, async (req, res) => {
  try {
    const { grade } = req.body;

    if (!grade || ![10, 11].includes(Number(grade))) {
      return res.status(400).json({ error: "Grade must be 10 or 11" });
    }

    const response = await axios.post(
      "http://127.0.0.1:6000/generate-mock-exam",
      { grade: Number(grade) },
      { timeout: 30000 }
    );

    return res.json(response.data);
  } catch (error) {
    console.error("❌ Mock exam generation failed:", error.message);
    return res.status(503).json({ error: "Mock exam service unavailable" });
  }
});

module.exports = router;
