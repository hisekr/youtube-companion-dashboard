const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/google', authController.startAuth);
router.get('/callback', authController.handleCallback);
router.post('/logout', authController.logout);
router.get('/check', authController.checkAuth);

module.exports = router;