const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const authMiddleware = require('../middleware/authMiddleware');
const validation = require('../utils/validation');

router.post('/add', authMiddleware.checkAuth, validation.validateComment, commentsController.addComment);
router.post('/reply', authMiddleware.checkAuth, validation.validateReply, commentsController.replyToComment);
router.delete('/:id', authMiddleware.checkAuth, commentsController.deleteComment);
router.get('/:videoId', authMiddleware.checkAuth, commentsController.listComments);

module.exports = router;