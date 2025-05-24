const Goal = require("../models/goal.model.js");
const multer = require('multer');

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save images in "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

const getGoals = async (req, res) => {
    try {
        const goals = await Goal.find();
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSingleGoal = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const goal = await Goal.findById(id);
        res.status(200).json(goal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addGoal = async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null; // Store image path
        const goal = await Goal.create({ title, description, image });
        res.status(200).json({ goal, message: 'Goal created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateGoal = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        } //This protects against: Malformed IDs, Injection attacks, and Accidental crashes


        let goal = await Goal.findById(id);
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }
        let image = goal.image;
        if (req.file) {
            image = `/uploads/${req.file.filename}`;
        }
        const updatedGoal = await Goal.findByIdAndUpdate(
            id,
            { title: req.body.title, description: req.body.description, image },
            { new: true }
        )
        res.status(200).json({ updatedGoal, message: 'Goal updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteGoal = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        } //This protects against: Malformed IDs, Injection attacks, and Accidental crashes

        const goal = await Goal.findByIdAndDelete(id);
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }
        const deletedGoal = await Goal.findById(id);
        res.status(200).json({ deletedGoal, message: 'Goal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getGoals, getSingleGoal, addGoal, updateGoal, deleteGoal, upload }