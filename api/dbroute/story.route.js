/**
 * @swagger
 * /stories:
 *   get:
 *     summary: Get all story entries
 *     tags: [Story]
 *     responses:
 *       200:
 *         description: List of story items
 * 
 * @swagger
 * /stories/{id}:
 *   get:
 *     summary: Get a single story entry
 *     tags: [Story]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the story to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Story item
 * 
 * @swagger
 * /stories:
 *   post:
 *     summary: Create a new story
 *     tags: [Story]
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
 *         description: Story created successfully
 * 
 * @swagger
 * /stories/{id}:
 *   put:
 *     summary: Update a story
 *     tags: [Story]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the story to update
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               subtitle:
 *                 type: string
 *               subtitle_description:
 *                 type: string
 *               location:
 *                 type: string
 *               date:
 *                 type: string
 *               impact_description:
 *                 type: string
 *               impact_bulletPoints:
 *                 type: array
 *                 items:
 *                   type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Story updated successfully
 * 
 * @swagger
 * /stories/{id}:
 *   delete:
 *     summary: Delete a story
 *     tags: [Story]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the story to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Story deleted successfully
 */
const express = require('express');
const controller = require('../controller/story.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.get('/', controller.getStories);
router.get('/:id', controller.getSingleStory);

router.post('/', authMiddleware, controller.upload.single('image'), controller.addStory);
router.put('/:id', authMiddleware, controller.upload.single('image'), controller.updateStory);
router.delete('/:id', authMiddleware, controller.deleteStory);

module.exports = router