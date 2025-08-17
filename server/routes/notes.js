const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const authMiddleware = require('../middleware/authMiddleware');
const validation = require('../utils/validation');

router.post('/add', authMiddleware.checkAuth, validation.validateNote, notesController.addNote);
router.get('/:videoId', authMiddleware.checkAuth, notesController.getNotes);

module.exports = router;