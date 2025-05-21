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
        subsubtitle: {
            type: String,
            required: [true, 'Sub-sub-title is required'],
        },
        subsubtitle_description: {
            type: String,
            required: [true, 'Sub-sub-title body is required'],
        },
        bulletPoints: {
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