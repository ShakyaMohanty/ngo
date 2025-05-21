const express = require('express');
const controller = require('../controller/vission.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');
const router = express.Router();

router.get('/', controller.getVissions);
router.get('/:id', controller.getSingleVission);

router.post('/', authMiddleware, controller.upload.single('image'), controller.addVission);
router.put('/:id', authMiddleware, controller.upload.single('image'), controller.updateVission);
router.delete('/:id', authMiddleware, controller.deleteVission);

module.exports = router