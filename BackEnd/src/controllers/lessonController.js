const { Lesson, LessonStep, AnswerOption } = require('../models/LessonModels');
const { sequelize } = require('../config/database');

// 1. Get List of All Lessons
exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.findAll();
    res.status(200).json(lessons);
  } catch (error) {
    console.error("Error fetching lessons:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 2. Get Full Content for ONE Lesson
exports.getLessonContent = async (req, res) => {
  try {
    const { lesson_id } = req.params;

    // A. Check if lesson exists
    const lesson = await Lesson.findByPk(lesson_id);
    if (!lesson) {
      return res.status(404).json({ detail: "Lesson not found" });
    }

    // B. Fetch Steps + Eager Load Options (Replaces 'selectinload')
    const steps = await LessonStep.findAll({
      where: { lesson_id },
      order: [['order_index', 'ASC']],
      include: [{
        model: AnswerOption,
        as: 'options' // This makes the JSON key "options", matching your React app exactly!
      }]
    });

    res.status(200).json(steps);
  } catch (error) {
    console.error("Error fetching lesson content:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 3. Create a new Lesson Step with Options
exports.createLessonStep = async (req, res) => {
  // Start a transaction so if options fail, the step isn't saved half-built
  const t = await sequelize.transaction();

  try {
    const { lesson_id, theory_text, question_text, theory_media_url, options } = req.body;

    // 1. Calculate the next order_index automatically
    const maxStep = await LessonStep.findOne({
      where: { lesson_id },
      order: [['order_index', 'DESC']],
      transaction: t
    });
    
    const new_index = maxStep ? maxStep.order_index + 1 : 1;

    // 2. Create the Step (Theory + Question)
    const newStep = await LessonStep.create({
      lesson_id,
      order_index: new_index,
      theory_text,
      question_text,
      theory_media_url
    }, { transaction: t });

    // 3. Create the Answer Options
    if (options && options.length > 0) {
      // Map over the array to inject the new step's ID
      const optionsWithStepId = options.map(opt => ({
        lesson_step_id: newStep.id,
        option_text: opt.option_text,
        is_correct: opt.is_correct
      }));
      
      await AnswerOption.bulkCreate(optionsWithStepId, { transaction: t });
    }

    // Commit transaction
    await t.commit();
    res.status(200).json({ status: "success", step_id: newStep.id });

  } catch (error) {
    await t.rollback();
    console.error("Error creating lesson step:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};