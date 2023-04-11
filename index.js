const http = require('http');
const config = require('./src/config');
const app = require('./src/server');

// Create a new HTTP server and pass in the Express app
const server = http.createServer(app);

// Start the server and listen for incoming requests
server.listen(config.PORT, () => {
    console.log(`Server started on port ${config.PORT}`);
});