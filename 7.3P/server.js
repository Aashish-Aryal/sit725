const express = require("express");
const cors = require("cors");
const router = require("./routers/router");
const app = express();
const dbConnection = require('./dbConnection');
const http = require('http');
const { Server } = require('socket.io');

// Create HTTP server and Socket.io instance
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3040', 'http://127.0.0.1:3040'] }));

// Use router
app.use('/api', router);

// Timer logic
let timerValue = 0;
setInterval(() => {
    timerValue += 1;
    io.emit('timerUpdate', timerValue); // Emit the updated timer value to all connected clients
}, 1000); // Update every second

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.emit('timerUpdate', timerValue); // Send initial timer value to new clients

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start server
const port = process.env.PORT || 3040;
server.listen(port, async () => {
    console.log(`Server started on port ${port}`);
    await dbConnection.connectDB();  // Connect to the database
});
