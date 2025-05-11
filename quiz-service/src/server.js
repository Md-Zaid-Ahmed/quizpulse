const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');

// Create HTTP Server
const server = http.createServer(app);

// Configure Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Update this for production
    methods: ["GET", "POST"]
  }
});

// Initialize Socket Handlers
require('./sockets/quizHandler')(io); 

// Start Server
const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`Quiz service running on port ${PORT}`);
  console.log(`Socket.IO endpoint: ws://localhost:${PORT}`);
});