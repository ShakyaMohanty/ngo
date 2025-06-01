const mangoose = require('mongoose');

const storySchema = new mangoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required']
        },
        description: {
            type: String,
            required: [true, 'Description is required']
        },
        subtitle: {
            type: String,
            required: [true, 'Subtitle is required']
        },
        subtitle_description: {
            type: String,
            required: [true, 'Subtitle description is required']
        },
        location: {
            type: String,
            required: [true, 'Location is required'],
        },
        date: {
            type: Date,
            required: [true, 'Story date is required'],
        },
        impact_description: {
            type: String,
            required: [true, 'Impact description is required'],
        },
        impact_bulletPoints: {
            type: [String],
            default: [],
        },
        image: {
            type: String,
            required: false
        }
    },
    //time stamp
    {
        timestamps: { createdAt: 'addedAt', updatedAt: 'editedAt' },
    }
);

const Story = mangoose.model('vission', storySchema);
module.exports = Story;