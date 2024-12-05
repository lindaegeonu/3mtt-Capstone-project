//middlewares.js/index.js

// const jwt = require("jsonwebtoken");
// const User = require("../models/users");
// const { ACCESS_TOKEN_SECRET } = process.env;


// exports.verifyAccessToken = async (req, res, next) => {

//     const token = req.header("Authorization");
//     if (!token) return res.status(400).json({ status: false, msg: "Token not found" });
//     let user;
//     try {
//         user = jwt.verify(token, ACCESS_TOKEN_SECRET);
//     }
//     catch (err) {
//         return res.status(401).json({ status: false, msg: "Invalid token" });
//     }

//     try {
//         user = await User.findById(user.id);
//         if (!user) {
//             return res.status(401).json({ status: false, msg: "User not found" });
//         }

//         req.user = user;
//         next();
//     }
//     catch (err) {
//         console.error(err);
//         return res.status(500).json({ status: false, msg: "Internal Server Error" });
//     }
// }


// middlewares/index.js
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = process.env;

exports.verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ msg: "Access denied!" });

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ msg: "Invalid token!" });
        req.user = user;
        next();
    });
};