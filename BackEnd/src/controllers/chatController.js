const chatService = require('../services/chatService');
const ChatMessage = require('../models/ChatMessage');
const ChatSession = require('../models/ChatSession');

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
 * Load the last N messages from a session and convert them to Gemini
 * chat history format (role: 'user' | 'model'), oldest first.
 * Used to give the AI conversation context so it "remembers" past exchanges.
 */
async function loadRecentHistory(sessionId, count = 10) {
  if (!sessionId) return [];

  const messages = await ChatMessage.findAll({
    where: { sessionId },
    order: [['createdAt', 'DESC']],
    limit: count,
    attributes: ['role', 'content'],
  });

  // Reverse to chronological order and map 'bot' → 'model' for Gemini
  return messages.reverse().map((m) => ({
    role: m.role === 'bot' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));
}

/**
 * POST /api/chat
 * Processes a chat message. Routes deterministic quadratic equations
 * through the built-in solver; everything else goes to Gemini AI.
 * Auto-saves user + bot messages when sessionId is provided.
 * Passes last 5 conversation turns as context so the AI remembers.
 */
const postChat = async (req, res, next) => {
  try {
    const userInput = req.body?.userInput;
    const language = req.body?.language || req.headers['x-language'] || 'en';
    const sessionId = req.body?.sessionId || null;

    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    console.log(`[chat] incoming [${language}] session=${sessionId || 'none'}: ${userInput.substring(0, 80)}`);

    // Save user message
    await persistMessage(sessionId, 'user', userInput.trim());

    // Load last 5 exchanges (10 messages) for conversation memory
    const recentHistory = await loadRecentHistory(sessionId, 10);

    // AI model — pass recent history for context
    const response = await chatService.runChat(userInput, language, recentHistory);
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
