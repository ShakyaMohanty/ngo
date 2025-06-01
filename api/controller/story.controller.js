const Story = require("../models/story.model.js");
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

const getStories = async (req, res) => {
    try {
        const stories = await Story.find();
        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSingleStory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid story ID' });
        }

        const story = await Story.findById(id);
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }
        res.status(200).json(story);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addStory = async (req, res) => {
    try {
        const { title, description, subtitle, subtitle_description, location, date, impact_description, impact_bulletPoints } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null; // Store image path
        const story = await Story.create({ title, description, subtitle, subtitle_description, location, date, impact_description, impact_bulletPoints, image });
        res.status(200).json({ story, message: 'Story created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateStory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        } //This protects against: Malformed IDs, Injection attacks, and Accidental crashes


        let story = await Story.findById(id);
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }
        let image = story.image;
        if (req.file) {
            if (image) {
                // // // Synchronous code for deleting old image

                // //    if (fs.existsSync(oldImagePath)) {
                // //    fs.unlinkSync(oldImagePath);
                // //    console.log('Deleted old image:', oldImagePath);
                // //    }

                // const oldImagePath = path.join(__dirname, '../../', image);

                // try {
                //     if (fs.existsSync(oldImagePath)) {
                //         fs.unlinkSync(oldImagePath);
                //         console.log('Old image deleted:', oldImagePath);
                //     }
                // } catch (err) {
                //     if (err.code !== 'ENOENT'){
                //         return res.status(500).json({ message: 'Failed to delete old image file', error: err.message });
                //     }
                // }

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
            image = `/uploads/${req.file.filename}`;
        }
        const updatedStory = await Story.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                description: req.body.description,
                subtitle: req.body.subtitle,
                subtitle_description: req.body.subtitle_description,
                location: req.body.location,
                date: req.body.date,
                impact_description: req.body.impact_description,
                impact_bulletPoints: req.body.impact_bulletPoints,
                image
            },
            {
                new: true
            }
        )
        res.status(200).json({ updatedStory, message: 'Story updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteStory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        } //This protects against: Malformed IDs, Injection attacks, and Accidental crashes

        const story = await Story.findByIdAndDelete(id);
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
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

        const deletedStory = await Story.findById(id);
        res.status(200).json({ deletedStory, message: 'Story deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getStories, getSingleStory, addStory, updateStory, deleteStory, upload }