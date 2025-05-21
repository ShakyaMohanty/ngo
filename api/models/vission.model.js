const mangoose = require('mongoose');

const vissionSchema = new mangoose.Schema(
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

const Vission = mangoose.model('vission', vissionSchema);
module.exports = Vission;