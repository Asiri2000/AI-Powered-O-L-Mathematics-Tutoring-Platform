const chatService = require('../services/chatService');
const ChatMessage = require('../models/ChatMessage');
const ChatSession = require('../models/ChatSession');

const MATH_SOLVER_ENABLED = process.env.MATH_SOLVER_ENABLED !== 'false';

/**
 * Helper: auto-save a message to the database if a sessionId is provided.
 * Also auto-titles the session from the first user message.
 */
async function persistMessage(sessionId, role, content, source = null) {
  if (!sessionId) return null;

  const msg = await ChatMessage.create({ sessionId, role, content, source });

  // Auto-title: use first user message
  if (role === 'user') {
    const session = await ChatSession.findByPk(sessionId);
    if (session && session.title === 'New Chat') {
      session.title = content.substring(0, 100);
      await session.save();
    }
    // Touch updatedAt
    if (session) {
      session.changed('updatedAt', true);
      await session.save();
    }
  }

  return msg;
}

/**
 * POST /api/chat
 * Processes a chat message. Routes deterministic quadratic equations
 * through the built-in solver; everything else goes to Gemini AI.
 * Auto-saves user + bot messages when sessionId is provided.
 */
const postChat = async (req, res, next) => {
  try {
    const userInput = req.body?.userInput;
    const language = req.body?.language || 'en';
    const sessionId = req.body?.sessionId || null;

    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    console.log(`[chat] incoming [${language}] session=${sessionId || 'none'}: ${userInput.substring(0, 80)}`);

    // Save user message
    await persistMessage(sessionId, 'user', userInput.trim());

    // Deterministic math solver
    if (MATH_SOLVER_ENABLED) {
      const quad = chatService.parseQuadratic(userInput);
      if (quad) {
        const solution = chatService.solveQuadratic(quad);
        await persistMessage(sessionId, 'bot', solution, 'deterministic');
        return res.json({ response: solution, source: 'deterministic' });
      }
    }

    // AI model
    const response = await chatService.runChat(userInput, language);
    await persistMessage(sessionId, 'bot', response, 'model');

    res.json({ response, source: 'model' });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    next(error);
  }
};

/**
 * GET /api/chat/models
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
