const express = require('express');
const controller = require('../controller/campaign.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.get('/', controller.getCampaigns);
router.get('/:id', controller.getSingleCampaign);

router.post('/', authMiddleware, controller.upload.single('image'), controller.addCampaign);
router.put('/:id', authMiddleware, controller.upload.single('image'), controller.updateCampaign);
router.delete('/:id', authMiddleware, controller.deleteCampaign);

module.exports = router