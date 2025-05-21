const express = require('express');
const controller = require('../controller/goal.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.get('/', controller.getGoals);
router.get('/:id', controller.getSingleGoal);

router.post('/', authMiddleware, controller.upload.single('image'), controller.addGoal);
router.put('/:id', authMiddleware, controller.upload.single('image'), controller.updateGoal);
router.delete('/:id', authMiddleware, controller.deleteGoal);

module.exports = router