// import jwt from 'jsonwebtoken';
const User = require('../models/user.model.js');

const authMiddleware = async (req, res, next) => {

    let sessionId;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    // console.log(req.headers.authorization);
    if (authHeader && authHeader?.startsWith("Bearer")) {
        sessionId = authHeader.split(" ")[1];
        if (!sessionId) {
            return res.status(401).json({ message: "No session Id, authorization denied" });
        } else {
            try {

                const user = await User.findOne({ sessionId });

                if (!user) {
                    return res.status(403).json({ message: "user not found" });
                }
                if (!user.sessionExpires || user.sessionExpires < new Date()) {
                    return res.status(403).json({ message: "session expired!" });
                }
                // const decode = jwt.verify(token, process.env.JWT_SECRET);
                // if (!decode.isAdmin) {
                //     return res.status(403).json({ message: "Forbidden. Admin access only." });
                // }
                // req.user = decode;
                // console.log(`decoded user is: ${req.user.id}`)
                req.user = user;


                next();
            } catch (error) {
                res.status(400).json({ message: "Session is not valid" });
            }
        }
    } else {
        res.status(401).json({ message: "Session not found" })
    }
}

module.exports = authMiddleware;