const Campaign = require("../models/campaign.model.js");
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

const getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSingleCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        } //This protects against: Malformed IDs, Injection attacks, and Accidental crashes

        const campaign = await Campaign.findById(id);
        res.status(200).json(campaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addCampaign = async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;
        const campaign = await Campaign.create({ title, description, image });
        res.status(200).json({ campaign, message: 'Campaign created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        } //This protects against: Malformed IDs, Injection attacks, and Accidental crashes

        let campaign = await Campaign.findById(id);
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }
        let image = campaign.image;
        if (req.file) {
            image = `/uploads/${req.file.filename}`;
        }
        const updatedCampaign = await Campaign.findByIdAndUpdate(
            id,
            { title: req.body.title, description: req.body.description, image },
            { new: true }
        )
        res.status(200).json({ updatedCampaign, message: 'Campaign updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        } //This protects against: Malformed IDs, Injection attacks, and Accidental crashes

        const campaign = await Campaign.findByIdAndDelete(id);
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }
        const deletedCampaign = await Campaign.findById(id);
        res.status(200).json({ deletedCampaign, message: 'Campaign deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getCampaigns, getSingleCampaign, addCampaign, updateCampaign, deleteCampaign, upload };