const Work = require("../models/work.model.js");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
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
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const work = await Work.findById(id);
        if (!work) return res.status(404).json({ message: "Work not found" }); // added
        res.status(200).json(work);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addWork = async (req, res) => {
    try {
        const { title, description, subtitle, subtitle_description, approach_description, approach_bulletPoints, impact_description, impact_bulletPoints } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;
        const work = await Work.create(
            {
                title,
                description,
                subtitle,
                subtitle_description,
                approach_description,
                approach_bulletPoints,
                impact_description,
                impact_bulletPoints,
                image
            }
        );
        res.status(200).json({ work: work, message: 'Work created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateWork = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        // Find the existing work
        let work = await Work.findById(id);
        if (!work) {
            return res.status(404).json({ message: 'Work not found' });
        }

        // If a new image is uploaded, update it; otherwise, keep the old image
        let image = work.image;
        if (req.file) {
            if (image) {
                const oldImagePath = path.join(__dirname, '../../', image);
                try {
                    await fs.promises.unlink(oldImagePath);
                } catch (err) {
                    if (err.code !== 'ENOENT') {
                        console.warn('Failed to delete image file:', err.message);
                    }
                }
            }
            image = `/uploads/${req.file.filename}`; // New uploaded image path
        }

        // Update the work with new data
        const updatedWork = await Work.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                description: req.body.description,
                subtitle: req.body.subtitle,
                subtitle_description: req.body.subtitle_description,
                approach_description: req.body.approach_description,
                approach_bulletPoints: req.body.approach_bulletPoints,
                impact_description: req.body.impact_description,
                impact_bulletPoints: req.body.impact_bulletPoints,
                image
            },
            {
                new: true
            }
        );

        res.status(200).json({ updatedWork, message: 'Work updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteWork = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const work = await Work.findByIdAndDelete(id);
        if (!work) {
            return res.status(404).json({ message: 'Work not found' });
        }
        let image = story.image;

        if (image) {
            // Asynchronous code for deleting old image
            const oldImagePath = path.join(__dirname, '../../', image);
            try {
                await fs.promises.unlink(oldImagePath);
            } catch (err) {
                if (err.code !== 'ENOENT') {
                    console.warn('Failed to delete image file:', err.message);
                }
            }
        }

        res.status(200).json({ message: 'Work deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getWorks, getSingleWork, addWork, updateWork, deleteWork, upload };