const express = require('express');
const connectDB = require('./config/db');
const dotenv = require("dotenv");
const itemRoutes = require('./Route/item-management/item-route'); 
const routes1 = require("./route/category-management/category-route"); 
const routes2 = require("./route/category-management/subCategory-route");
const authRoutes = require("./Route/user-management/authRoutes");
const userRoutes = require("./Route/user-management/userRoutes");
const cors = require('cors');
const bodyParser = require('body-parser');

// Load environment variables
dotenv.config();

const app = express();
app.use(cors({origin: true, Credential: true}))

//dbConnection
connectDB();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req,res) => res.send("Hello Server is Running.."));

// Middleware for JSON handling
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => res.send('Hello World!'));

app.use("/api/auth", authRoutes);   // Login/Register
app.use("/api/users", userRoutes);  // Profile/Admin functions


// ✅ Register item routes correctly
app.use('/api', itemRoutes);  // Fix the base path

// ✅ Register category routes correctly

app.use("/api/category",routes1)
app.use("/api/subcategory",routes2)



const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));