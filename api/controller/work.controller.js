const Work = require("../models/work.model.js");
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');

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
        const { title, description, subtitle, subtitle_description, subsubtitle, subsubtitle_description, bulletPoints, } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;
        const work = await Work.create({
            title: title,
            description: description,
            subtitle: subtitle,
            subtitle_description: subtitle_description,
            subsubtitle: subsubtitle,
            subsubtitle_description: subsubtitle_description,
            bulletPoints: Array.isArray(bulletPoints) ? bulletPoints : typeof bulletPoints === "string" ? bulletPoints.split(',').map(s => s.trim()) : [],
            image,
        });
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
        // Find the existing mission
        let work = await Work.findById(id);
        if (!work) {
            return res.status(404).json({ message: 'Work not found' });
        }

        // If a new image is uploaded, update it; otherwise, keep the old image
        let image = work.image;
        if (req.file) {
            // If a new image is uploaded, delete old one
            if (image) {
                const imagePath = path.join(__dirname, '../../', image);
                try {
                    // if (fs.existsSync(imagePath)) {
                    //     fs.unlinkSync(imagePath); // delete old image
                    // }
                    await fs.unlink(imagePath);
                    console.log('Old image deleted:', imagePath);
                } catch (err) {
                    if (err.code !== 'ENOENT') {
                        console.warn('Failed to delete old image:', err.message);
                    }
                }
            }

            // New uploaded image path
            image = `/uploads/${req.file.filename}`;
        }

        const {
            title,
            description,
            subtitle,
            subtitle_description,
            subsubtitle,
            subsubtitle_description,
            bulletPoints
        } = req.body;

        // Update the mission with new data
        const updatedWork = await Work.findByIdAndUpdate(
            id,
            {
                title,
                description,
                subtitle,
                subtitle_description,
                subsubtitle,
                subsubtitle_description,
                bulletPoints: Array.isArray(bulletPoints)
                    ? bulletPoints
                    : typeof bulletPoints === 'string'
                        ? bulletPoints.split(',').map(s => s.trim())
                        : [],
                image: req.file ? `/uploads/${req.file.filename}` : existingWork.image
            },
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
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const work = await Work.findByIdAndDelete(id);
        if (!work) {
            return res.status(404).json({ message: 'Work not found' });
        }
        // Delete the associated image file if it exists
        if (work.image) {
            const imagePath = path.join(__dirname, '../../', work.image);
            try {
                // if (fs.existsSync(imagePath)) {
                //     fs.unlinkSync(imagePath);
                //     console.log('Image file deleted:', imagePath);
                // }
                await fs.unlink(imagePath);
                console.log('Image file deleted:', imagePath);
            } catch (err) {
                if (err.code !== 'ENOENT') {
                    console.warn('Image deletion failed:', err.message);
                }
            }
        }

        res.status(200).json({ message: 'Work deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getWorks, getSingleWork, addWork, updateWork, deleteWork, upload };