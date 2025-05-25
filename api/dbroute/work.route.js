/**
 * @swagger
 * tags:
 *   name: Work
 *   description: Work section APIs
 */

/**
 * @swagger
 * /works:
 *   get:
 *     summary: Get all work entries
 *     tags: [Work]
 *     responses:
 *       200:
 *         description: List of work items
 * 
 * @swagger
 * /works/{id}:
 *   get:
 *     summary: Get a single work entry
 *     tags: [Work]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the work to retrieve
 *         required: true
 *         schema:  
 *           type: string
 *     responses:
 *       200:
 *         description: Work item
 * 
 * @swagger
 * /works:
 *   post:
 *     summary: Create a new work
 *     tags: [Work]
 *     security:
 *       - bearerAuth: []
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
 *               subsubtitle:
 *                 type: string
 *               subsubtitle_description:
 *                 type: string
 *               bulletPoints:
 *                 type: array
 *                 items:
 *                   type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Work created successfully
 * 
 * @swagger
 * /works/{id}:
 *   put:
 *     summary: Update a work
 *     tags: [Work]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the work to update
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
 *               subsubtitle:
 *                 type: string
 *               subsubtitle_description:
 *                 type: string
 *               bulletPoints:
 *                 type: array
 *                 items:
 *                   type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Work updated successfully
 * 
 * @swagger
 * /works/{id}:
 *   delete:
 *     summary: Delete a work
 *     tags: [Work]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the work to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Work deleted successfully
 * 
 */
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