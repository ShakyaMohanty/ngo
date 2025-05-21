const mangoose = require('mongoose');

const missionSchema = new mangoose.Schema(
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
        // isCompleted: {
        //     type: Boolean,
        //     required: true
        // },
        // totalDonations: {
        //     type: Number,
        //     default: 0
        // }
    },
    //time stamp
    {
        timestamps: { createdAt: 'addedAt', updatedAt: 'editedAt' },
    }
);

const Mission = mangoose.model('mission', missionSchema);
module.exports = Mission;