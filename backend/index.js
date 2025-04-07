const express = require('express');
const connectDB = require('./config/db');
const itemRoutes = require('./Route/item-management/item-route'); // Ensure correct path
const routes1 = require("./route/category-management/category-route")
const routes2 = require("./route/category-management/subCategory-route");
const router = require("./route/category-management/category-route");
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(cors({ origin: true, credentials: true }));

// Connect to the database
connectDB();

// Middleware for JSON handling
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => res.send('Hello World!'));

// ✅ Register item routes correctly
app.use('/api', itemRoutes);  // Fix the base path

// ✅ Register category routes correctly
app.use("/api/category",routes1)
app.use("/api/subcategory",routes2)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));