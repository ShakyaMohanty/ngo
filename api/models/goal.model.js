const mangoose = require('mongoose');
const goalSchema = new mangoose.Schema(
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

const Goal = mangoose.model('goal', goalSchema);
module.exports = Goal;