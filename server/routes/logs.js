const express = require('express');
const router = express.Router();
const logsController = require('../controllers/logsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware.checkAuth, logsController.getLogs);

module.exports = router;