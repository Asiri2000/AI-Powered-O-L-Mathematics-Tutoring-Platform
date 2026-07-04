const ChatSession = require('../models/ChatSession');
const ChatMessage = require('../models/ChatMessage');
const { Op } = require('sequelize');

/**
 * Build a where-clause for querying sessions owned by req.identity.
 * Returns null if req.identity is not set (should not happen if middleware runs).
 */
function ownerClause(req) {
  if (!req.identity) return null;
  return { ownerType: req.identity.type, ownerId: req.identity.id };
}

// ---------------------------------------------------------------------------
//  Session CRUD
// ---------------------------------------------------------------------------

/**
 * GET /api/chat/sessions
 * List all sessions for the current identity, newest first.
 */
const listSessions = async (req, res, next) => {
  try {
    const where = ownerClause(req);
    if (!where) return res.status(401).json({ message: 'No identity found' });

    const sessions = await ChatSession.findAll({
      where,
      order: [['updatedAt', 'DESC']],
      attributes: ['id', 'title', 'language', 'ownerType', 'createdAt', 'updatedAt'],
    });
    res.json({ sessions });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/chat/sessions
 * Create a new session. Body: { title?, language? }
 */
const createSession = async (req, res, next) => {
  try {
    if (!req.identity) return res.status(401).json({ message: 'No identity found' });

    const { title, language } = req.body;
    const session = await ChatSession.create({
      ownerType: req.identity.type,
      ownerId: req.identity.id,
      title: title || 'New Chat',
      language: language || 'en',
    });
    res.status(201).json({ session });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/chat/sessions/:id
 * Delete a session and all its messages. Scoped to the current owner.
 */
const deleteSession = async (req, res, next) => {
  try {
    const where = { id: req.params.id, ...ownerClause(req) };
    const session = await ChatSession.findOne({ where });
    if (!session) return res.status(404).json({ message: 'Session not found' });

    await ChatMessage.destroy({ where: { sessionId: session.id } });
    await session.destroy();
    res.json({ message: 'Session deleted' });
  } catch (err) {
    next(err);
  }
};

// ---------------------------------------------------------------------------
//  Message access
// ---------------------------------------------------------------------------

/**
 * GET /api/chat/sessions/:id/messages
 * Load all messages for a session, oldest first.
 */
const getMessages = async (req, res, next) => {
  try {
    const where = { id: req.params.id, ...ownerClause(req) };
    const session = await ChatSession.findOne({ where });
    if (!session) return res.status(404).json({ message: 'Session not found' });

    const messages = await ChatMessage.findAll({
      where: { sessionId: session.id },
      order: [['createdAt', 'ASC']],
      attributes: ['id', 'role', 'content', 'source', 'createdAt'],
    });

    res.json({ session, messages });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/chat/sessions/:id/messages
 * Save a message. Used internally by chatController for auto-save.
 * Also exposed for frontend to manually save if needed.
 */
const saveMessage = async (req, res, next) => {
  try {
    const where = { id: req.params.id, ...ownerClause(req) };
    const session = await ChatSession.findOne({ where });
    if (!session) return res.status(404).json({ message: 'Session not found' });

    const { role, content, source } = req.body;
    if (!role || !content) {
      return res.status(400).json({ message: 'role and content are required' });
    }

    const message = await ChatMessage.create({
      sessionId: session.id,
      role,
      content,
      source: source || 'model',
    });

    // Auto-title: use first user message as session title
    if (role === 'user' && session.title === 'New Chat') {
      session.title = content.substring(0, 100);
      await session.save();
    }

    // Touch the session's updatedAt
    session.changed('updatedAt', true);
    await session.save();

    res.status(201).json({ message });
  } catch (err) {
    next(err);
  }
};

module.exports = { listSessions, createSession, deleteSession, getMessages, saveMessage };
