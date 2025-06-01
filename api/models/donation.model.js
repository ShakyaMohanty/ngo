const mongoose = require('mongoose');
console.log(mongoose.Schema)
const donationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        campaign: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Campaign',
            required: [true, 'Campaign reference is required'],
        },
        fname: {
            type: String,
            required: true,
        },
        lname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    {
        timestamps: true,
    }
);

const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;
