// Import Zone
const express = require('express');
const { readdirSync } = require('fs');
const cors = require('cors')
const path = require('path');

// Declare variable Zone
const server = express();
const PORT = process.env.PORT || 8000;

server.use(express.json());
server.use(cors());

// Automatically generate routes
readdirSync(path.join(__dirname, 'Routes')).map((r) => server.use(require("./Routes/" + r)));
// readdirSync("./Routes").map((r) => server.use("/api", require("./Routes/" + r)));

server.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT} \n URL: http://localhost:${PORT}`);
});

module.exports = server;