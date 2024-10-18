// Import Zone
const express = require('express');
const { get_drone_logs, post_drone_logs } = require('../Controllers/drone_logs.controller');
const { get_drones_data } = require('../Middlewares/get_drone_data.middleware');


// Declare variable Zone
const router = express.Router();
const LOGS_PATH = "https://app-tracking.pockethost.io/api/collections/drone_logs/records";


// Route Zone
router.get("/logs/:page", get_drones_data(LOGS_PATH, "log"), get_drone_logs);
router.post("/logs", post_drone_logs(LOGS_PATH, "log"));

// Export Zone
module.exports = router;