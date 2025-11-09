const express = require("express");
const router = express.Router();

// Import v1 routes
const authRoutes = require("./v1/auth");
const taskRoutes = require("./v1/tasks");

// Mount v1 routes
router.use("/v1/auth", authRoutes);
router.use("/v1/tasks", taskRoutes);

module.exports = router;
