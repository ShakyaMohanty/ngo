const Mission = require("../models/mission.model.js");
const multer = require('multer');

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/'); // Save images in "uploads" folder
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

const getMissions = async (req, res) => {

    try {
        const missions = await Mission.find();
        res.status(200).json(missions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSingleMission = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const mission = await Mission.findById(id);
        res.status(200).json(mission);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const addMission = async (req, res) => {
    try {

        const { title, description } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null; // Store image path
        const mission = await Mission.create({ title, description, image });
        res.status(200).json({ mission, message: 'Mission created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateMission = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Find the existing mission
        let mission = await Mission.findById(id);
        if (!mission) {
            return res.status(404).json({ message: 'Mission not found' });
        }

        // If a new image is uploaded, update it; otherwise, keep the old image
        let image = mission.image;
        if (req.file) {
            image = `/uploads/${req.file.filename}`; // New uploaded image path
        }

        // Update the mission with new data
        const updatedMission = await Mission.findByIdAndUpdate(
            id,
            { title: req.body.title, description: req.body.description, image },
            { new: true }
        );

        res.status(200).json({ updatedMission, message: 'Mission updated successfully' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteMission = async (req, res) => {
    try {

        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const mission = await Mission.findByIdAndDelete(id);
        if (!mission) {
            return res.status(404).json({ message: 'Mission not found' });
        }

        res.status(200).json({ message: 'Mission deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getMissions, getSingleMission, addMission, updateMission, deleteMission, upload };