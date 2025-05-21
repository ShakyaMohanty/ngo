const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,     // Removes whitespace from both ends of the email
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters long']
        },
        isAdmin: {
            type: Boolean,
            required: true
        },
        sessionId: {
            type: String,
            default: null
        },
        sessionExpires: {
            type: Date,
            default: null
        },
        resetString: String,
        resetStringExpiryTime: Date
    },

    {
        timestamps: true,
    }
)

const User = mongoose.model('user', userSchema);
module.exports = User;