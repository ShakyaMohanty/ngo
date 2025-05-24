const Work = require("../models/work.model.js");
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

const getWorks = async (req, res) => {
    try {
        const works = await Work.find();
        res.status(200).json(works);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSingleWork = async (req, res) => {
    try {
        const { id } = req.params;
        const work = await Work.findById(id);
        if (!work) return res.status(404).json({ message: "Work not found" }); // added
        res.status(200).json(work);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addWork = async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;
        const work = await Work.create({ title, description, image });
        res.status(200).json({ work: work, message: 'Work created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateWork = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the existing mission
        let work = await Work.findById(id);
        if (!work) {
            return res.status(404).json({ message: 'Work not found' });
        }

        // If a new image is uploaded, update it; otherwise, keep the old image
        let image = work.image;
        if (req.file) {
            image = `/uploads/${req.file.filename}`; // New uploaded image path
        }

        // Update the mission with new data
        const updatedWork = await Work.findByIdAndUpdate(
            id,
            { title: req.body.title, description: req.body.description, image },
            { new: true }
        );

        res.status(200).json({ updatedWork, message: 'Work updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteWork = async (req, res) => {
    try {
        const { id } = req.params;
        const work = await Work.findByIdAndDelete(id);
        if (!work) {
            return res.status(404).json({ message: 'Work not found' });
        }

        res.status(200).json({ message: 'Work deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getWorks, getSingleWork, addWork, updateWork, deleteWork, upload };