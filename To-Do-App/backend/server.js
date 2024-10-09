// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const todoRoutes = require('./routes/todo');
const cors = require('cors');

// Initialize the app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3002", // Allow requests from this origin (your front-end)
        methods: ["GET", "POST"]
    }
});

// Use CORS middleware
app.use(cors({
    origin: "http://localhost:3002", // Allow requests from this origin (React front-end)
}));


// Serve static files (HTML, CSS, etc.) from the public folder
app.use(express.static('public'));

// Handle Socket.IO connections
io.on('connection', (socket) => {
    // Register the routes and event handlers
    todoRoutes(io, socket);
});

// Start the server
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
