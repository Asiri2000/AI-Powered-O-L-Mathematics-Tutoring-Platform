const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware that extracts caller identity from either:
 *   1. JWT Bearer token (logged-in user) → { type: 'user', id: <userId> }
 *   2. x-guest-token header (guest)       → { type: 'guest', id: <token> }
 *
 * This middleware does NOT block the request — it only enriches it.
 * Downstream handlers use req.identity to scope data access.
 *
 * Usage:
 *   router.get('/sessions', sessionIdentity, listSessions);
 */
function sessionIdentity(req, res, next) {
  // 1. Try JWT
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.identity = { type: 'user', id: decoded.id };
      // Also attach user object for convenience (if needed downstream)
      User.findByPk(decoded.id, { attributes: ['id', 'username', 'email'] })
        .then((user) => { req.user = user || null; next(); })
        .catch(() => next());
      return;
    } catch (_) {
      // JWT invalid — fall through to guest
    }
  }

  // 2. Try guest token
  const guestToken = req.headers['x-guest-token'];
  if (guestToken && typeof guestToken === 'string' && guestToken.length >= 32) {
    req.identity = { type: 'guest', id: guestToken };
    return next();
  }

  // 3. Anonymous
  req.identity = null;
  next();
}

module.exports = sessionIdentity;
