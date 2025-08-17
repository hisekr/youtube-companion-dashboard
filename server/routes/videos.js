const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const authMiddleware = require('../middleware/authMiddleware');
const validation = require('../utils/validation');

router.get('/', authMiddleware.checkAuth, videoController.listVideos);
router.get('/:id', authMiddleware.checkAuth, videoController.getVideoDetails);
router.post('/update', authMiddleware.checkAuth, validation.validateVideoUpdate, videoController.updateVideo);

module.exports = router;