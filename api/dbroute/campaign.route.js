/**
 * @swagger
 * tags:
 *   name: Campaign
 *   description: Campaign section APIs
 * 
 * @swagger
 * /campaigns:
 *   get:
 *     summary: Get all campaign entries
 *     tags: [Campaign]
 *     responses:
 *       200:
 *         description: List of campaign items
 * 
 * @swagger
 * /campaigns/{id}:
 *   get:
 *     summary: Get a single campaign entry
 *     tags: [Campaign]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the campaign to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Campaign item
 * 
 * @swagger
 * /campaigns:
 *   post:
 *     summary: Create a new campaign
 *     tags: [Campaign]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Campaign created successfully
 * 
 * @swagger
 * /campaigns/{id}:
 *   put:
 *     summary: Update a campaign
 *     tags: [Campaign]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the campaign to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Campaign updated successfully
 * 
 * @swagger
 * /campaigns/{id}:
 *   delete:
 *     summary: Delete a campaign
 *     tags: [Campaign]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the campaign to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Campaign deleted successfully
 * 
 */
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