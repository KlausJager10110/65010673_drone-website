// Controller

const { default: axios } = require("axios");

exports.get_drone_logs = (req, res) => {
    const drone_logs_data = req.dronesData;
    const Total_Pages = req.totalPages;
    
    if (drone_logs_data) {
        const sorted_drone_logs = drone_logs_data.sort((a, b) => {
            return new Date(b.created) - new Date(a.created);
        });

        
        const formatted_drone_data = sorted_drone_logs.map(drone_log => ({
            drone_id: drone_log.drone_id,
            drone_name: drone_log.drone_name,
            created: drone_log.created,
            light: drone_log.light,
            country: drone_log.country,
            celsius: drone_log.celsius
        }));

        res.status(200).json({
            total_pages: Total_Pages,
            drone_logs: formatted_drone_data
        });
    } else {
        res.status(404).send("Not Found");
    }
};

exports.post_drone_logs = (path) => {
    // const new_drone_data = req.body.drone_data;
    return async (req, res) => {
        const data = await req.body;

        if (data) {
            console.log(data);
            try {
                const response = await axios.post(path,
                    {
                        celsius: data.celsius,
                        country: data.country,
                        drone_id: data.drone_id,
                        drone_name: data.drone_name,
                    },
                    {
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
                if (response.status === 200) {
                    res.status(200).json({
                        message: 'Data posted successfully',
                        data: response.data
                    });
                }
            } catch (error) {
                res.status(500).json({
                    message: 'Failed to post data',
                    error: error.message
                });
            }
        } else {
            res.status(400).json({ message: 'No drone data provided' });
        }
    }
};
