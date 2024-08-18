const express = require("express");
const cors = require("cors");
const router = require("./routers/router");
const app = express();
const dbConnection = require('./dbConnection');

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3040', 'http://127.0.0.1:3040'] }));

// Use router
app.use('/api', router);

// Start server
const port = process.env.PORT || 3040;
app.listen(port, async () => {
    console.log(`Server started on port ${port}`);
    await dbConnection.connectDB();  // Connect to the database
});
