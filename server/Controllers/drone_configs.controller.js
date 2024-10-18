// Controllers

exports.get_drone_by_drone_Id = (req, res) => {
    const dr_id = parseInt(req.params.drone_Id);

    if (!req.params.drone_Id) {
        const formatted_drones_data = req.dronesData.map(drone => ({
            drone_id: drone.drone_id,
            drone_name: drone.drone_name,
            light: drone.light || "on",
            country: drone.country,
            max_speed: drone.max_speed
                ? drone.max_speed > 110
                    ? 110
                    : drone.max_speed
                : 100,
            population: drone.population
        }));
        return res.status(200).json(formatted_drones_data);
    }

    const drone = req.dronesData.find(drone => drone.drone_id === dr_id);

    if (drone) {
        res.status(200).json([{
            drone_id: drone.drone_id,
            drone_name: drone.drone_name,
            light: drone.light || "on",
            country: drone.country,
            max_speed: drone.max_speed
                ? drone.max_speed > 110
                    ? 110
                    : drone.max_speed
                : 100,
            population: drone.population
        }]);
    } else {
        return res.status(404).send("NOT_FOUND");
    }
};

exports.get_drone_status_by_Id = (req, res) => {
    const id = req.params.id;

    if (id !== null && id !== undefined) {
        const drone = req.dronesData.find(drone => drone.drone_id == id);
        if (drone) {
            res.status(200).json({
                condition: drone.condition,
            });
        } else {
            return res.status(404).send("NOT_FOUND");
        }
    } else {
        return res.status(400).send("Invalid id.");
    }
}