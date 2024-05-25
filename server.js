// Import the Express.js module
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const app = express();

// Connect to the database
connectDb();

const port = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use("/api/contacts", require("./routes/contactRoutes"));

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
