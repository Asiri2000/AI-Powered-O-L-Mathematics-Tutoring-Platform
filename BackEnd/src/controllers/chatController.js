const chatService = require('../services/chatService');

const MATH_SOLVER_ENABLED = process.env.MATH_SOLVER_ENABLED !== 'false';

/**
 * POST /api/chat
 * Processes a chat message. Routes deterministic quadratic equations
 * through the built-in solver; everything else goes to Gemini AI.
 */
const postChat = async (req, res, next) => {
  try {
    const userInput = req.body?.userInput;

    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    // Deterministic quadratic equation solver
    if (MATH_SOLVER_ENABLED) {
      const quad = chatService.parseQuadratic(userInput);
      if (quad) {
        const solution = chatService.solveQuadratic(quad);
        return res.json({ response: solution, source: 'deterministic' });
      }
    }

    // Route to Gemini AI
    const response = await chatService.runChat(userInput);
    res.json({ response, source: 'model' });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    next(error);
  }
};

/**
 * GET /api/models
 * Returns the list of available Gemini models and their supported methods.
 */
const getModels = async (req, res, next) => {
  try {
    const models = await chatService.fetchAvailableModels();
    res.json({ models });
  } catch (error) {
    console.error('Error listing models:', error);
    next(error);
  }
};

module.exports = { postChat, getModels };
