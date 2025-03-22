const express = require('express');
const connectDB = require('./config/db');
const itemRoutes = require('./Route/item-management/item-route'); // Ensure correct path
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
