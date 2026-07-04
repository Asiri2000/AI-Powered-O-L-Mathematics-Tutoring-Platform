const express = require('express');
const router = express.Router();
const sessionIdentity = require('../middleware/sessionIdentity');
const ctrl = require('../controllers/chatHistoryController');

// All history routes use sessionIdentity (JWT or guest token).
// This middleware does NOT block — it only enriches req.identity.
router.use(sessionIdentity);

router.get('/sessions',            ctrl.listSessions);
router.post('/sessions',           ctrl.createSession);
router.delete('/sessions/:id',     ctrl.deleteSession);
router.get('/sessions/:id/messages', ctrl.getMessages);
router.post('/sessions/:id/messages', ctrl.saveMessage);

module.exports = router;
