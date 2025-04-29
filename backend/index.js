const express = require("express");
const dbConnection = require("./config/db")
const routes1 = require("./route/category-management/category-route")
const routes2 = require("./route/category-management/subCategory-route");
const router = require("./route/category-management/category-route");
const bodyParser = require("body-parser");
const cors = require("cors")

const app = express();
app.use(cors({origin: true, Credential: true}))

//dbConnection
dbConnection()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use("/uploads", express.static("uploads"))

app.get("/", (req,res) => res.send("Hello Server is Running.."));
app.use("/api/category",routes1)
app.use("/api/subcategory",routes2)

router

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));