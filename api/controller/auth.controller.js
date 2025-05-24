const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
// const jwt = require('jsonwebtoken');
const { v4 } = require('uuid');

const signupUser = async (req, res) => {
    try {

        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const adminExists = await User.findOne({ isAdmin: true });
        const authUserExists = await User.findOne({ username: username });
        const authEmailExists = await User.findOne({ email: email });
        let isAdmin;

        if (authUserExists) {
            return res.status(400).json({ message: `User: '${username}' already exists` })
        }
        if (authEmailExists) {
            return res.status(400).json({ message: `Email: '${email}' already exists` })
        }

        if (adminExists) {
            isAdmin = false
        } else {
            isAdmin = true
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, isAdmin });
        await newUser.save();
        res.status(201).json({ message: `User Registered successfully with username: ${username} ` });


    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' + err.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, isAdmin: true });
        if (!user) {
            res.status(400).json({ message: `User-${username} not found` });
        } else {
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                res.status(400).json({ message: 'Password doesn\'t match' });
            } else {
                const sessionId = v4();
                const sessionExpires = new Date(Date.now() + 1 * 60 * 60 * 1000);
                user.sessionId = sessionId;
                user.sessionExpires = sessionExpires;
                await user.save();

                // const oneTimeToken = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: '3h'});
                // res.cookie('authToken', oneTimeToken, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 3 * 60 * 60 * 1000 });
                res.status(200).json({ message: 'Login successful', sessionId, username: user.username });
            }

        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const logoutUser = async (req, res) => {
    // console.log(req.user);
    try {

        if (!req.user) {
            return res.status(404).json({ message: "User not Authenticated..." });
        }

        req.user.sessionId = null;
        req.user.sessionExpires = null;
        await req.user.save();
        /* res.status(204).send(); // No content, no message  */
        res.status(200).json({ message: "Logged out successfully. Please remove token from client storage." });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    //client must handle sessionID removal from storage

};

const forgotPassword = async (req, res) => {
    try {
        if (req.headers.authorization || req.headers.Authorization) {
            return res.status(400).json({ message: "You are already logged in." });
        }
        const email = req.body.email;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(200).json({ message: "User not found" });
        }

        // Generate Reset String
        const resetString = crypto.randomBytes(32).toString("hex");
        user.resetString = resetString;
        user.resetStringExpiryTime = Date.now() + 300000; // 5 min
        await user.save();

        // Send Email (Replace with your SMTP settings)
        const transporter = nodemailer.createTransport({
            secure: true,
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset Request",
            text: `Click the link to reset your password: ${process.env.CLIENT_URL}/reset-password?resetString=${resetString}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Password reset link sent to email." });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Reset Password (Verify Token & Update Password)
const resetPassword = async (req, res) => {
    try {
        // const resetCode = req.query.resetString;
        const resetCode = req.body.resetString;
        const newPassword = req.body.newPassword;
        const user = await User.findOne({ resetString: resetCode, resetStringExpiryTime: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ message: "Invalid User or Time expired" });
        }


        user.password = await bcrypt.hash(newPassword, 10);
        user.resetString = null;
        user.resetStringExpiryTime = null;
        await user.save();

        res.status(200).json({ message: "Password has been reset successfully." });

    } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};


const validateSession = async (req, res) => {
    try {
        // console.log(req.user);
        if (req.user.sessionExpires > new Date()) {
            return res.status(200).json({ isSessionValid: true, message: "Session valid", username: req.user.username });
        }
        res.status(403).json({ isSessionValid: false, message: "Session Time Expired, please Log in..." })

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }


}

module.exports = { signupUser, loginUser, logoutUser, forgotPassword, resetPassword, validateSession };
