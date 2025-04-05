const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/user-management/db"); // Ensure the DB connection function is correct
const authRoutes = require("./Routes/user-management/authRoutes");
const userRoutes = require("./Routes/user-management/userRoutes");

dotenv.config();
connectDB(); // Connect to your database

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api/auth", authRoutes);   // For Login and Register
app.use("/api/users", userRoutes);  // For User Profile and Admin Functions

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
