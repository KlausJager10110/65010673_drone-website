// Import Zone
const express = require('express');
const { get_drones_data } = require('../Middlewares/get_drone_data.middleware');
const {
    get_drone_by_drone_Id,
    get_drone_status_by_Id
} = require('../Controllers/drone_configs.controller');

// Declare variable Zone
const router = express.Router();
const CONFIG_PATH = "https://script.googleusercontent.com/macros/echo?user_content_key=pOsROhqoNHkIdXAp7yneNTsWnnYMsyGWqG6MdWZ0-lSGW638QXikauzlBnZq3T5D-yUxHTbeYX6d78R7rLfVSE068nr0H1Orm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnOQwROx_Wq-O5wsPy5w5JUsdPdcpj8TWgjjVAuN4sDTiMrnThHKU7n7LmNcslGllO5_ldGegmAJuXjfvqC1tFaecv-CYmXuM6Nz9Jw9Md8uu&lib=M9_yccKOaZVEQaYjEvK1gClQlFAuFWsxN";

// Route Zone
router.get("/configs/:drone_Id?", get_drones_data(CONFIG_PATH, "config"), get_drone_by_drone_Id);
router.get("/status/:id", get_drones_data(CONFIG_PATH, "config"), get_drone_status_by_Id);

// Export Zone
module.exports = router;
