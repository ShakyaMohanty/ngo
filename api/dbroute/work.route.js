const express = require('express');
const { getWorks, getSingleWork, addWork, updateWork, deleteWork, upload } = require('../controller/work.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');
const router = express.Router();

router.get('/', getWorks);
router.get('/:id', getSingleWork);

router.post('/', authMiddleware, upload.single('image'), addWork);
router.put('/:id', authMiddleware, upload.single('image'), updateWork);
router.delete('/:id', authMiddleware, deleteWork);

module.exports = router