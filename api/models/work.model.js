const mongoose = require('mongoose');

const workSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        subtitle: {
            type: String,
            required: [true, 'Subtitle is required'],
        },
        subtitle_description: {
            type: String,
            required: [true, 'Subtitle description is required'],
        },
        approach_description: {
            type: String,
            required: [true, 'Approach body is required'],
        },
        approach_bulletPoints: {
            type: [String], // array of bullet point lines
            default: [],
            required: false,
        },
        impact_description: {
            type: String,
            required: [true, 'Impact body is required'],
        },
        impact_bulletPoints: {
            type: [String], // array of bullet point lines
            default: [],
            required: false,
        },
        image: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: { createdAt: 'addedAt', updatedAt: 'editedAt' },
    }
);

const Work = mongoose.model('work', workSchema);
module.exports = Work;