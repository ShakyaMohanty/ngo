const mangoose = require('mongoose');
const campaignSchema = new mangoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required']
        },
        description: {
            type: String,
            required: [true, 'Description is required']
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

const Campaign = mangoose.model('campaign', campaignSchema);
module.exports = Campaign;