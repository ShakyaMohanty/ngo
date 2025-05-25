/**
 * @swagger
 * /missions:
 *   get:
 *     summary: Get all mission entries
 *     tags: [Mission]
 *     responses:
 *       200:
 *         description: List of mission items
 */
const route = require('express');
const authMiddleware = require('../middlewares/auth.middleware.js');
const { getMissions, getSingleMission, addMission, updateMission, deleteMission, upload } = require('../controller/mission.controller.js');

const router = route.Router();



// mission crud
router.get('/', getMissions);
router.get('/:id', getSingleMission);

router.post('/', authMiddleware, upload.single('image'), addMission);
router.put('/:id', authMiddleware, upload.single('image'), updateMission);
router.delete('/:id', authMiddleware, deleteMission);

module.exports = router;