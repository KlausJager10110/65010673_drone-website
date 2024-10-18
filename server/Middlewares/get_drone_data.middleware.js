// Middlewares

// Declare variables Zone
const axios = require('axios');

// Declare middlewares functions Zone
exports.get_drones_data = (path, type) => {
    return async (req, res, next) => {
        const page = req.params.page;

        try {
            if (type === "log") {
                const response = await axios.get(path + "?page=" + page);
                if (response && (response.data.data || response.data.items)) {
                    req.dronesData = response.data.data || response.data.items;
                    req.totalPages = response.data.totalPages || 1;
                    next();
                } else {
                    res.status(404).json({ message: "No data available" });
                }
            } else if (type === "config") {
                const response = await axios.get(path);
                if (response && (response.data.data || response.data.items)) {
                    req.dronesData = response.data.data || response.data.items;
                    next();
                } else {
                    res.status(404).json({ message: "No data available" });
                }
            }

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
};