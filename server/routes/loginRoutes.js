const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/check-email', authController.checkEmail);
router.post('/check-nickname', authController.checkNickname);

module.exports = router;