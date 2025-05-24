const Vission = require("../models/vission.model.js");
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

const getVissions = async (req, res) => {

    try {
        const vissions = await Vission.find();
        res.status(200).json(vissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSingleVission = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const vission = await Vission.findById(id);
        res.status(200).json(vission);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const addVission = async (req, res) => {
    try {

        const { title, description } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null; // Store image path
        const vission = await Vission.create({ title, description, image });
        res.status(200).json({ vission, message: 'Vission created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateVission = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        let vission = await Vission.findById(id);
        if (!vission) {
            return res.status(404).json({ message: 'Vission not found' });
        }

        let image = vission.image;
        if (req.file) {
            image = `/uploads/${req.file.filename}`; // New uploaded image path
        }

        const updatedVission = await Vission.findByIdAndUpdate(
            id,
            { title: req.body.title, description: req.body.description, image },
            { new: true }
        );

        res.status(200).json({ updatedVission, message: 'Vission updated successfully' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteVission = async (req, res) => {
    try {

        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const vission = await Vission.findByIdAndDelete(id);
        if (!vission) {
            return res.status(404).json({ message: 'Vission not found' });
        }

        res.status(200).json({ message: 'Vission deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getVissions, getSingleVission, addVission, updateVission, deleteVission, upload };