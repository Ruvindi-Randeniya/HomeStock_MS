const express = require('express');
const connectDB = require('./config/db');
const itemRoutes = require('./Route/item-management/item-route'); // Ensure correct path
const routes1 = require("./Route/category-management/category-route") // Ensure correct path
const routes2 = require("./Route/category-management/subCategory-route")
const cors = require('cors');
const aiRoutes = require('./Route/item-management/aiRoute.js');
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
app.use('/ai', aiRoutes);
// ✅ Register category routes correctly
app.use("/api/category",routes1)
app.use("/api/subcategory",routes2)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));