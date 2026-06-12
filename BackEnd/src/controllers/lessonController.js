const Lesson = require("../models/Lesson");
const LessonStep = require("../models/LessonStep");
const AnswerOption = require("../models/AnswerOption");

/**
 * GET /api/lessons/
 * Return all lessons
 */
exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.findAll({ order: [["id", "ASC"]] });
    return res.json(lessons);
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return res.status(500).json({ error: "Failed to fetch lessons" });
  }
};

/**
 * GET /api/lessons/:id/content
 * Return all steps (with answer options) for a given lesson
 */
exports.getLessonContent = async (req, res) => {
  try {
    const { id } = req.params;

    const steps = await LessonStep.findAll({
      where: { lesson_id: id },
      order: [["order_index", "ASC"]],
    });

    // Attach answer options to each step
    const stepsWithOptions = await Promise.all(
      steps.map(async (step) => {
        const options = await AnswerOption.findAll({
          where: { lesson_step_id: step.id },
        });
        return {
          ...step.toJSON(),
          answer_options: options,
        };
      })
    );

    return res.json(stepsWithOptions);
  } catch (error) {
    console.error("Error fetching lesson content:", error);
    return res.status(500).json({ error: "Failed to fetch lesson content" });
  }
};

/**
 * POST /api/lessons/add-step
 * Add a new step to a lesson
 */
exports.addStep = async (req, res) => {
  try {
    const { lesson_id, order_index, media_url, theory_text, theory_media_url, question_text, answer_options, options } = req.body;
    const opts = answer_options || options;

    const step = await LessonStep.create({
      lesson_id,
      order_index,
      media_url,
      theory_text,
      theory_media_url,
      question_text,
    });

    if (opts && Array.isArray(opts)) {
      for (const opt of opts) {
        await AnswerOption.create({
          lesson_step_id: step.id,
          option_text: opt.option_text,
          is_correct: opt.is_correct || false,
        });
      }
    }

    return res.status(201).json({ message: "Step added", step });
  } catch (error) {
    console.error("Error adding step:", error);
    return res.status(500).json({ error: "Failed to add step" });
  }
};
