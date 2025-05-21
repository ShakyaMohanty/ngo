
const express = require('express');
const router = express.Router();
const controller = require('../controller/auth.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

router.post('/signup', controller.signupUser);
router.post('/login', controller.loginUser);
router.post('/logout', authMiddleware, controller.logoutUser);
router.get('/validate-session', authMiddleware, controller.validateSession);
router.post('/forgot-password', controller.forgotPassword);
router.post('/reset-password', controller.resetPassword);

module.exports = router