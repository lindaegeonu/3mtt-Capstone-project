// routes/profileRoutes.js

const express = require("express");
const router = express.Router();
const { getProfile } = require("../controller/profileControllers.js");
const { verifyAccessToken } = require("../middlewares/index.js");

// Routes beginning with /api/profile
router.get("/", verifyAccessToken, getProfile);

module.exports = router;